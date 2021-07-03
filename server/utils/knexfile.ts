import { Knex } from 'knex';
import { types } from 'pg'
import { Config } from './config';

types.setTypeParser(types.builtins.TIMESTAMPTZ, (value) => {
    return value === null ? null : value;
})


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
