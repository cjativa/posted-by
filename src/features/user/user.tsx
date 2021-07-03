import { IThread } from '../../../shared/thread';
import { IUser } from '../../../shared/user';
import { PostCard } from '../../components/postCard/postCard';
import { Block } from '../../components/block/block';
import { UserLayout } from './userLayout/userLayout';

export interface IUserProps {
    posts: IThread[],
    user: IUser,
};

export const User = ({ posts, user }: IUserProps) => {

    return (
        <UserLayout>

            <div className="w-7/12">
                <Block>
                    <div className=" grid grid-cols-1 gap-y-4">

                        <div className="grid grid-cols-1">
                            <div className="w-24 h-24 relative mb-4">
                                <div className="group w-full h-full rounded-full overflow-hidden shadow-inner">
                                    <img
                                        src={user.user_picture_url.replace('normal', '400x400')}
                                        alt={`Profile image for ${user.handle}`}
                                        className="object-cover object-center w-full h-full visible group-hover:hidden"
                                    />
                                </div>
                            </div>

                            <p className="font-bold">{user.name}</p>
                            <span>@{user.handle}</span>
                        </div>


                        <p>Posts</p>

                        <div className="">
                            {posts.length > 0 &&
                                <div className="grid grid-cols-3 gap-y-8 justify-items-center">
                                    {
                                        posts.map((post) => {
                                            return (
                                                <PostCard
                                                    post={post}
                                                    link={`/${user.handle}/${post.slug}`}
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