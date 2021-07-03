import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

import { AdminLayout } from '../adminLayout/adminLayout';
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
        <AdminLayout>
            <div className="col-start-2 col-span-10">
                <Block>

                    {/** When no threads are available */}
                    {availableThreads.length == 0 &&
                        <div className="flex flex-col justify-center items-center">
                            <p>You don't have any posts at the moment</p>
                            <p>After you generate a post for your thread, it'll show up here! 😁</p>
                        </div>
                    }

                    {/** Display threads when available */}
                    {availableThreads.length > 0 &&
                        <div className="grid grid-cols-3 justify-center gap-y-4 h-3/5">
                            {availableThreads.map((post) => {
                                return (
                                    < PostCard
                                        post={post}
                                        link={''}
                                    />
                                );
                            })}
                        </div>
                    }
                </Block>
            </div>
        </AdminLayout >
    );
};