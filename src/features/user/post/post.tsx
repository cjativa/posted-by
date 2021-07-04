import { IThread } from '../../../../shared/thread';
import { IUser } from '../../../../shared/user';
import { Block } from '../../../components/block/block';
import { UserLayout } from '../userLayout/userLayout';
import { Heading } from '../../../components/heading/heading';

export interface IFullPostProps {
    post: IThread,
};

export const FullPost = ({ post }: IFullPostProps) => {

    console.log(post.thread_posts);

    return (
        <UserLayout>

            <div className="w-7/12">
                <Block>
                    <div className=" grid grid-cols-1">

                        <Heading>
                            {post.title}
                        </Heading>

                        {/** Display each post in the thread */}
                        {post.thread_posts &&
                            post.thread_posts.map((threadPost) => {
                                return (
                                    <Block paddingX={16} paddingY={8}>

                                        <div
                                            className="w-7/12 whitespace-pre-line "
                                            dangerouslySetInnerHTML={{ __html: threadPost.text }}
                                        />

                                    </Block>
                                )
                            })
                        }

                    </div>
                </Block>
            </div>
        </UserLayout >
    );
};