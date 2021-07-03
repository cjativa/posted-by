import { GetServerSideProps } from 'next';
import { UserDAO } from '../../server/domains/users/userDao';

import { PageService } from '../../server/services/pageService';
import { FullPost } from '../../src/features/user/post/post';
import { IUserProps } from '../../src/features/user/user';

const ThreadPage = ({ posts }: IUserProps) => {
    return (
        <FullPost post={{} as any} />
    );
};

export default ThreadPage;

export const getServerSideProps: GetServerSideProps = async (context) => {



    return {
        props: {
            posts: [],
        },
    };
};