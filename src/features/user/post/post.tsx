import { IThread } from '../../../../shared/thread';
import { IUser } from '../../../../shared/user';
import { Block } from '../../../components/block/block';
import { UserLayout } from '../userLayout/userLayout';
import { Heading } from '../../../components/heading/heading';

export interface IFullPostProps {
    post: IThread,
};

const lineStyle = {
    border: '1px solid #f4ebeb',
    borderRadius: '5px',
    width: '50%',
};

export const FullPost = ({ post }: IFullPostProps) => {

    return (
        <UserLayout>
            <div className="w-6/12">
                <Block paddingX={0} paddingY={0}>
                    <div className={`bg-${post.theme_color}-400 h-80 w-full flex justify-center items-center`}>
                        <Heading>
                            {post.title}
                        </Heading>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 px-16 py-16">


                        {/** Display each post in the thread */}
                        <div className="flex flex-col">
                            {post.thread_posts &&
                                post.thread_posts.map((singlePost) => {
                                    const postText = singlePost
                                        .text
                                        .replace(/https:(\/\/t\.co\/([A-Za-z0-9]|[A-Za-z]){10})/g, '');

                                    return (
                                        <div className="grid grid-flow-row auto-rows-min gap-y-8 my-4 w-8/12">

                                            <div
                                                className="whitespace-pre-line leading-6"
                                                dangerouslySetInnerHTML={{ __html: postText }}
                                            />

                                            {singlePost.media &&
                                                singlePost.media?.map((media) => (
                                                    <img
                                                        key={media.media_key}
                                                        src={media.url}
                                                        className="rounded"
                                                    />
                                                ))
                                            }

                                            <hr style={lineStyle} />

                                        </div>
                                    );
                                })
                            }
                        </div>


                    </div>
                </Block>
            </div>
        </UserLayout >
    );
};