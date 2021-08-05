import { GetServerSideProps } from 'next';

import { Config } from '../../server/utils/config';
import { UserDAO } from '../../server/domains/users/userDao';
import { TWITTER_API_URL } from '../../server/utils/twitter';
import { ThreadDAO } from '../../shared/thread';
import { PageService } from '../../server/services/pageService';
import { FullPost } from '../../src/features/user/post/post';
import { IFullPostProps } from '../../src/features/user/post/post';
import axios from 'axios';

interface ITweetMedia {
    data: {
        id: string,
        text: string,
        attachments?: {
            media_keys: string[],
        },
    },
    includes: {
        media: {
            media_key: string,
            type: 'animated_gif' | 'photo' | 'video',
            url: string,
        }[],
    }
};

const ThreadPage = ({ post }: IFullPostProps) => {
    return (
        <FullPost post={post} />
    );
};

export default ThreadPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const postSlug = (context.query && context.query['slug'])
        ? context.query['slug'].toString()
        : null;

    console.log(postSlug);


    if (postSlug) {
        const post = await ThreadDAO.getThread(postSlug);

        // For each post in the thread
        // we'll retrieve the image/media/links/etc. for it
        if (post?.thread_posts) {
            const tweetMediaPromises = post?.thread_posts?.map((singlePost) => {
                return axios({
                    method: 'GET',
                    baseURL: TWITTER_API_URL,
                    url: `/2/tweets/${singlePost.tweet_id}`,
                    headers: {
                        Authorization: `Bearer ${Config.twitterBearerToken}`,
                        oauth_consumer_key: Config.twitterApiKey,
                    },
                    params: {
                        /* 'tweet.fields': 'created_at,attachments,referenced_tweets', */
                        'media.fields': 'media_key,preview_image_url,url',
                        'expansions': 'attachments.media_keys',
                    },
                });
            });
            const tweetMediaResults = (await Promise.all(tweetMediaPromises))
                .map((axiosResponse) => axiosResponse.data) as ITweetMedia[];

            // Now we'll add the media into each tweet that had the media
            tweetMediaResults.forEach((tweetMedia) => {
                if (tweetMedia.data.attachments && tweetMedia.includes) {
                    const matchedTweet = post
                        ?.thread_posts
                        ?.find((singlePost) => singlePost.tweet_id === tweetMedia.data.id);

                    // Get the media information for each attachment
                    const matchedMediaInformation = tweetMedia
                        .data
                        .attachments
                        .media_keys
                        .map((attachmentId) => {
                            const foundMedia = tweetMedia
                                .includes
                                .media
                                .find((media) => media.media_key === attachmentId);

                            return foundMedia!;
                        });

                    if (matchedTweet) {
                        matchedTweet.media = matchedMediaInformation;
                    }
                }
            });
        }

        if (post) {
            return {
                props: {
                    post,
                }
            }
        }
    }

    return {
        notFound: true,
    };
};