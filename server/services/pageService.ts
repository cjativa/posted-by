import { nanoid } from 'nanoid';
import slugify from 'slugify';
import { Media } from 'twitter-api-client/dist/interfaces/types/StatusesShowTypes';
import {
    ThreadDAO,
    IThreadPost,
} from '../domains/threads/threadDao';
import { TweetHelpers } from '../helpers/tweetHelpers';
import { IMAGE_COLORS } from '../../shared/colors';


export class PageService {

    public static async generatePage(userId: number, conversationId: string, threadList: IThreadPost[], media: Media[] | undefined) {

        // We'll extract the first line of the tweet as a title
        // and slugify it and append a unique id
        const pageTitle = TweetHelpers.getFirstLine(threadList[0].text);
        const slugged = slugify(pageTitle, {
            lower: true,
            strict: true,
        });
        const sluggedTitle = `${slugged}-${nanoid(6)}`;

        // Get the an image for this tweet if it has one
        const tweetCoverImage = (media && media.length > 0 && media[0].media_url_https)
            ? media[0].media_url_https
            : null;

        // Get a color for this post
        const themeColor = IMAGE_COLORS[Math.floor(Math.random() * IMAGE_COLORS.length)];

        // Insert this as the page object
        // and store the threads
        try {
            await ThreadDAO.createParentThreadPage(conversationId, userId, pageTitle, sluggedTitle, tweetCoverImage, themeColor);
            await ThreadDAO.addThreadPosts(threadList, conversationId);
        } catch (error) {
            throw Error(`An error occurred creating a page for your thread ${error.toString()}`)
        }
    };

    public static async getPages(userId: string) {
        return await ThreadDAO.getAllThreads(userId, true);
    };
};