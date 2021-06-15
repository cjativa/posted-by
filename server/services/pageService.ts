import { nanoid } from 'nanoid';
import slugify from 'slugify';

import {
    ThreadDAO,
    IThreadPost,
} from '../domains/threads/threadDao';
import { TweetHelpers } from '../helpers/tweetHelpers';



export class PageService {

    public static async generatePage(userId: number, conversationId: string, threadList: IThreadPost[]) {

        // We'll extract the first line of the tweet as a title
        // and slugify it and append a unique id
        const pageTitle = TweetHelpers.getFirstLine(threadList[0].text);
        const slugged = slugify(pageTitle, {
            lower: true,
        });

        const sluggedTitle = `${slugged}-${nanoid(6)}`;

        // Insert this as the page object
        // and store the threads
        try {
            await ThreadDAO.createParentThreadPost(conversationId, userId, pageTitle, sluggedTitle);
            await ThreadDAO.addThreadPosts(threadList, conversationId);
        } catch (error) {
            throw Error(`An error occurred creating a page for your thread ${error.toString()}`)
        }
    };
};