import { GetServerSideProps } from 'next';
import { UserDAO } from '../../server/domains/users/userDao';
import { ThreadDAO } from '../../shared/thread';

import { PageService } from '../../server/services/pageService';
import { FullPost } from '../../src/features/user/post/post';
import { IFullPostProps } from '../../src/features/user/post/post';

const ThreadPage = ({ post }: IFullPostProps) => {
    return (
        <FullPost post={post} />
    );
};

export default ThreadPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const postSlug = (context.query && context.query['slug'])
        ? context.query['slug'].toString()
        : null;

    if (postSlug) {
        const post = await ThreadDAO.getThread(postSlug);

        if (post) {
            return {
                props: {
                    post,
                }
            }
        }
    }

    return {
        notFound: true,
    };
};