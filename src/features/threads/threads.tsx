import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

import { UserLayout } from '../userLayout/userLayout';
import { Block } from '../../components/block/block';
import { IThread } from '../../../shared/thread';
import { PostCard } from '../../components/postCard/postCard';

export const Threads = () => {

    const [_, request] = useAxios({}, { manual: true });
    const [availableThreads, setAvailableThreads] = useState<IThread[]>([]);

    useEffect(() => {
        const fetchThreads = async () => {
            const { data } = await request({
                url: 'post',
                method: 'GET',
            });

            setAvailableThreads(data);
        };

        fetchThreads();
    }, []);

    return (
        <UserLayout>
            <Block>
                <div className="flex flex-col justify-center gap-y-4 h-3/5">

                    {/** Display threads when available */}
                    {
                        availableThreads.map((post) => {
                            return (
                                < PostCard
                                    post={post}
                                />
                            );
                        })
                    }

                    {/** When no threads are available */}
                    {availableThreads.length == 0 &&
                        <>
                            <p>You don't have any posts at the moment</p>
                            <p>After you generate a post, it'll show up here! 😁</p>
                        </>
                    }

                </div>
            </Block>
        </UserLayout >
    );
};