import { Knex } from '../../services/database';

export interface IThreadPost {
    text: string,
    tweet_id: string,
    created_at: string,
    thread_parent_id: string,

    media?: {
        media_key: string,
        type: 'animated_gif' | 'photo' | 'video',
        url: string,
    }[],
};

export interface IThread {
    conversation_id: string,
    user_id: string,
    created_at: string,
    title: string,
    slug: string,
    cover_image: string,
    theme_color: string,

    thread_posts?: IThreadPost[],
};


export class ThreadDAO {

    public static async createParentThreadPage(id: string, userId: number, title: string, slug: string, coverImage: string | null, theme: string) {
        return await Knex('thread_parents')
            .insert({
                conversation_id: id,
                user_id: userId,
                title,
                slug,
                created_at: Knex.fn.now(),
                cover_image: coverImage,
                theme_color: theme,
            })
            .returning('*');
    };

    public static async addThreadPosts(posts: any[], parentId: string) {
        const addablePosts = posts.map((post) => {
            return {
                text: post.text,
                tweet_id: post.id,
                created_at: post.created_at,
                thread_parent_id: parentId,
            };
        });

        return await Knex('thread_posts')
            .insert(addablePosts);
    };

    public static async getAllThreads(userId: string, slim: boolean): Promise<IThread[]> {
        let threadPosts;
        const foundThreads = await Knex<IThread>('thread_parents')
            .select('*');

        // When slim, we only want the first tweet for each thread
        if (slim) {
            threadPosts = await Promise.all(
                foundThreads.map(async (threadParent) => {
                    return await Knex('thread_posts')
                        .limit(1)
                        .where({
                            thread_parent_id: threadParent.conversation_id
                        })
                        .orderBy('created_at', 'asc');
                })
            );
        }

        // Otherwise, we want all of them
        else {
            threadPosts = await Promise.all(
                foundThreads.map(async (threadParent) => {
                    return await Knex<IThreadPost>('thread_posts')
                        .where({
                            thread_parent_id: threadParent.conversation_id,
                        })
                        .orderBy('created_at', 'asc');
                })
            );
        }

        // Add the thread posts to each thread
        threadPosts.forEach((threadPosts, index) => {
            foundThreads[index]['thread_posts'] = threadPosts;
        });

        return foundThreads;
    };

    public static async getThread(slug: string): Promise<IThread | undefined> {
        const fullThread = await Knex<IThread>('thread_parents')
            .select('*')
            .where({ slug })
            .first();

        // If there was a valid thread for this slug
        // look up the thread posts
        if (fullThread) {
            const threadPosts = await Knex<IThreadPost>('thread_posts')
                .select('*')
                .where({
                    thread_parent_id: fullThread.conversation_id,
                });

            fullThread['thread_posts'] = threadPosts;

            return fullThread;
        }
    };
};