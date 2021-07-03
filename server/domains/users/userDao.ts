import { Knex } from '../../services/database';

export interface IUser {
    user_picture_url: string,
    twitter_user_id: string,
    name: string,
    handle: string,
};

export class UserDAO {

    public static async findUser(id: string): Promise<IUser> {
        const users = await Knex('registered_users')
            .select('*')
            .where({ 'twitter_user_id': id });

        return users.shift();
    };

    public static async findUserByHandle(handle: string): Promise<IUser> {
        const user = await Knex('registered_users')
            .select('*')
            .where({ handle })
            .first();

        return user;
    };

    public static async registerUser(twitterUserId: string, handle: string, userPictureUrl: string, name: string) {
        await Knex('registered_users')
            .insert({
                twitter_user_id: twitterUserId,
                handle,
                user_picture_url: userPictureUrl,
                name,
            });
    };
};
