import { useState, ChangeEvent } from 'react';
import useAxios from 'axios-hooks';

import { UserLayout } from '../userLayout/userLayout';
import { Button } from '../../components/button/button';
import { Block } from '../../components/block/block';
import { Input } from '../../components/input/input';
import { FormField } from '../../components/formField/formField';


export const Home = () => {

    const [_, request] = useAxios({}, { manual: true });

    const [postId, setPostId] = useState('');
    const [fetchedPost, setFetchedPost] = useState(null);


    const onPostType = (event: ChangeEvent<HTMLInputElement>) => {
        setPostId(event.target.value);
    };

    const onGenerateClick = async () => {
        const { data } = await request({
            url: 'post',
            method: 'POST',
            data: {
                tweetId: postId,
            }
        });

        setFetchedPost(data);
    };

    return (
        <UserLayout>

            {/** Tweet input area */}
            <Block>
                <div className="flex flex-col justify-center gap-y-4">
                    <div className="grid auto-rows-min gap-y-4">

                        <FormField label={'Enter the first tweet in your thread to generate a page for it'}>
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
                                onClick={onGenerateClick}
                            >
                                Generate my page
                            </Button>
                        </div>
                    </div>
                </div>
            </Block>

            {/** Retrieved tweet block */}
            {fetchedPost &&
                <div className="my-20">

                    <Block>
                        <p>Generated a page for your thread ✔️</p>


                    </Block>
                </div>
            }
        </UserLayout>
    );
};