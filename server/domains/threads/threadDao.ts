import { Knex } from '../../services/database';

export interface IThreadPost {
    text: string,
    id: string,
    created_at: string,
};

export interface IThread {
    conversationId: string,
    userId: string,
    createdAt: string,
    title: string,
    slug: string,

    threadPosts?: IThreadPost[],
};

export class ThreadDAO {

    public static async createParentThreadPage(id: string, userId: number, title: string, slug: string) {
        return await Knex('thread_parents')
            .insert({
                conversation_id: id,
                user_id: userId,
                title,
                slug,
                created_at: Knex.fn.now(),
            })
            .returning('*');
    };

    public static async addThreadPosts(posts: IThreadPost[], parentId: string) {
        const addablePosts = posts.map((post) => {
            return {
                content: post.text,
                tweet_id: post.id,
                created_at: post.created_at,
                thread_parent_id: parentId,
            };
        });

        return await Knex('thread_posts')
            .insert(addablePosts);
    };

    public static async getAllThreads(userId: string): Promise<IThread[]> {
        const foundThreads = await Knex('thread_parents')
            .select('*')

        const threads = foundThreads.map((thread) => {
            return {
                conversationId: thread.conversation_id,
                userId,
                createdAt: thread.created_at,
                title: thread.title,
                slug: thread.slug,
            };
        });

        return threads;
    }
};