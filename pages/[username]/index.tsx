import { URL } from 'url';
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
    const username = (context.query && context.query['username'])
        ? context.query['username'].toString()
        : null;

    if (username) {
        const user = await UserDAO.findUserByHandle(username);

        // User was found using that username, so we can retrieve content for them
        if (user) {
            const posts = await PageService.getPages(user.twitter_user_id);
            const userInformation = await UserDAO.findUser(user.twitter_user_id);

            return {
                props: {
                    posts: posts,
                    user: userInformation,
                },
            };
        }
    }

    // Otherwise, no username or user found
    return {
        notFound: true,
    };
};