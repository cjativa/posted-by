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
                <Block>
                    <div className=" grid grid-cols-1 gap-y-6">

                        <Heading>
                            {post.title}
                        </Heading>

                        {/** Display each post in the thread */}
                        <div className="flex flex-col">
                            {post.thread_posts &&
                                post.thread_posts.map((threadPost) => {
                                    return (
                                        <div className="grid grid-flow-row auto-rows-min gap-y-8 my-4 w-8/12">

                                            <div
                                                className="whitespace-pre-line leading-6"
                                                dangerouslySetInnerHTML={{ __html: threadPost.text }}
                                            />
                                            <hr style={lineStyle} />

                                        </div>
                                    )
                                })
                            }
                        </div>


                    </div>
                </Block>
            </div>
        </UserLayout >
    );
};