import { GetServerSideProps } from 'next';
import { UserDAO } from '../../server/domains/users/userDao';

import { PageService } from '../../server/services/pageService';
import { User } from '../../src/features/user/user';
import { IUserProps } from '../../src/features/user/user';

const UsernamePage = ({ posts, user }: IUserProps) => {
    return (
        <User
            posts={posts}
            user={user}
        />
    );
};

export default UsernamePage;

export const getServerSideProps: GetServerSideProps = async (context) => {

    const posts = await PageService.getPages('284267911');
    const userInformation = await UserDAO.findUser('284267911');


    return {
        props: {
            posts: posts,
            user: userInformation,
        },
    };
};