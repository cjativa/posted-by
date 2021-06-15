import { Knex } from '../../services/database';

export interface IThreadPost {
    text: string,
    id: string,
    created_at: string,
};

export class ThreadDAO {

    public static async createParentThreadPost(id: string, userId: number, title: string, slug: string) {
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
};