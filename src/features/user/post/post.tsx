import { IThread } from '../../../../shared/thread';
import { IUser } from '../../../../shared/user';
import { Block } from '../../../components/block/block';
import { UserLayout } from '../userLayout/userLayout';

export interface IFullPostProps {
    post: IThread,
};

export const FullPost = ({ post }: IFullPostProps) => {

    return (
        <UserLayout>

            <div className="w-7/12">
                <Block>
                    <div className=" grid grid-cols-1 gap-y-4">
                        Thread contents

                    </div>
                </Block>
            </div>
        </UserLayout >
    );
};