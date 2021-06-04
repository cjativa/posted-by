import { Knex } from 'knex';

import { Config } from './config';

export const KnexConfig: Knex.Config = {
    client: 'pg',
    connection: {
        host: Config.databaseHost,
        user: Config.databaseUser,
        database: Config.databaseName,
        password: Config.databasePassword,

        timezone: 'utc',
    },
    pool: {
        min: 2,
        max: 10,
    },
};
