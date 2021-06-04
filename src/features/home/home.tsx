import { useState, ChangeEvent } from 'react';

import { UserLayout } from '../userLayout/userLayout';
import { Button } from '../../components/button/button';
import { Block } from '../../components/block/block';
import { Input } from '../../components/input/input';
import { FormField } from '../../components/formField/formField';


export const Home = () => {

    const [postId, setPostId] = useState('');

    const onPostType = (event: ChangeEvent<HTMLInputElement>) => {
        setPostId(event.target.value);
    };

    return (
        <UserLayout>
            <Block>
                <div className="flex flex-col justify-center p-8 gap-y-4">
                    <div className="grid grid-rows-2 gap-y-4 my-4">

                        <FormField label={'Enter the first tweet in your thread to generate a post for it'}>
                            <Input
                                type={'text'}
                                placeholder={'For example, 1400523045434015748'}
                                onChange={onPostType}
                                value={postId}
                            />
                        </FormField>

                        <div>
                            <Button
                                className="float-right"
                                style={'primary'}
                                onClick={() => { return '' }}
                            >
                                Generate my post!
                            </Button>
                        </div>
                    </div>
                </div>
            </Block>
        </UserLayout>
    );
};