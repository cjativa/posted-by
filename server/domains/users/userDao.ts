import { Knex } from '../../services/database';

export interface IUser {
    twitterUserId: string,
    name: string,
    handle: string,
};

export class UserDAO {

    public static async findUser(id: string) {
        const users = await Knex('registered_users')
            .select('*')
            .where({ 'twitter_user_id': id });

        return users.shift();
    };

    public static async registerUser(twitterUserId: string, handle: string) {
        await Knex('registered_users')
            .insert({
                twitter_user_id: twitterUserId,
                handle,
            });
    };
};
