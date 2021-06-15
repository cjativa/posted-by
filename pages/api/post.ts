import {
    NextApiRequest, NextApiResponse
} from 'next';
import axios, { AxiosResponse } from 'axios';

import {
    TwitterClient,
    TWITTER_API_URL,
} from '../../server/utils/twitter';
import { Config } from '../../server/utils/config';
import { TweetHelpers } from '../../server/helpers/tweetHelpers';
import { PageService } from '../../server/services/pageService';

export interface IThreadResponse {
    data?: {
        id: string,
        text: string,
        created_at: string,
    }[],

    meta: {
        newest_id?: string,
        oldest_id?: string,
        result_count: number,
    }
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    const tweetIdString = request.body.tweetId;
    const tweetId = TweetHelpers.getTweetId(tweetIdString);

    if (tweetId === null) {
        return response
            .status(400)
            .json('Could not locate valid tweet id in string');
    }

    // Get the tweet for the id
    const tweet = await TwitterClient
        .tweets
        .statusesShow({
            id: tweetId,
            trim_user: false,
            tweet_mode: 'extended',
        });

    // Use the raw API to get the tweet author's 
    // subsequent threaded tweets
    const author = tweet.user.screen_name;
    const { data } = await axios({
        method: 'GET',
        baseURL: TWITTER_API_URL,
        url: `/2/tweets/search/recent?query=from:${author}%20to:${author}%20conversation_id:${tweetId}`,
        headers: {
            Authorization: `Bearer ${Config.twitterBearerToken}`,
            oauth_consumer_key: Config.twitterApiKey,
        },
        params: {
            'tweet.fields': 'created_at,attachments,referenced_tweets',
            max_results: 100,
        },

    }) as AxiosResponse<IThreadResponse>;

    // This means we successfully retrieved the twitter thread
    // and associated posts
    if (data && data.data && data.data.length > 0) {

        // The tweets come twitter with newest being last
        const tweetsInOrder = [
            {
                id: tweetId,
                text: tweet.full_text,
                created_at: tweet.created_at,
            },
            ...data.data.reverse(),
        ];

        PageService.generatePage(tweet.user.id, tweetId, tweetsInOrder);

        return response
            .status(200)
            .json('Successfully found your thread');
    }

    return response
        .status(404)
        .json('Could not find a thread for your tweet id')
};

export default handler;