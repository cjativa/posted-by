import { useState, ChangeEvent } from 'react';

import { UserLayout } from '../userLayout/userLayout';
import { Button } from '../../components/button/button';
import { Block } from '../../components/block/block';
import { Input } from '../../components/input/input';
import { FormField } from '../../components/formField/formField';


export const Threads = () => {

    const [postId, setPostId] = useState('');

    const onPostType = (event: ChangeEvent<HTMLInputElement>) => {
        setPostId(event.target.value);
    };

    return (
        <UserLayout>
            <Block>
                <div className="flex flex-col justify-center p-8 gap-y-4 h-3/5">
                    <p>You don't have any posts at the moment</p>
                    <p>After you generate a post, it'll show up here! 😁</p>
                </div>
            </Block>
        </UserLayout >
    );
};