import { IThread } from '../../../shared/thread';
import { IUser } from '../../../shared/user';
import { PostCard } from '../../components/postCard/postCard';
import { Block } from '../../components/block/block';
import { UserSnip } from '../../components/userSnip/userSnip';
import { UserLayout } from './userLayout/userLayout';

export interface IUserProps {
    posts: IThread[],
    user: IUser,
};

export const User = ({ posts, user }: IUserProps) => {

    // Twitter images need to be resized for better resolution
    const userImageUrl = user.user_picture_url.replace('normal', '400x400');

    return (
        <UserLayout>

            <div className="w-7/12">
                <Block>
                    <div className="grid grid-cols-1 gap-y-4">
                        <UserSnip
                            imageUrl={userImageUrl}
                            name={user.name}
                            handle={user.handle}
                        />
                        <p>Posts</p>

                        {/** Display the list of available posts for the user */}
                        <div className="">
                            {posts.length > 0 &&
                                <div className="grid grid-cols-3 gap-y-8 justify-items-center">
                                    {
                                        posts.map((post) => {
                                            return (
                                                <PostCard
                                                    key={post.created_at}
                                                    post={post}
                                                    link={`/${user.handle}/${post.slug}`}

                                                    authorImageUrl={userImageUrl}
                                                    authorHandle={user.handle}
                                                    authorName={user.name}
                                                />
                                            );
                                        })
                                    }
                                </div>
                            }
                        </div>

                    </div>
                </Block>
            </div>
        </UserLayout >
    );
};