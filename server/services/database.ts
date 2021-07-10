import KnexConnector, { Knex as KnexType } from 'knex';

import { KnexConfig } from '../utils/knexfile';
import { Config } from '../utils/config';

declare global {
    namespace NodeJS {
        interface Global {
            Knex: KnexType<any, unknown[]>
        }
    }
};

export let Knex: KnexType;

// For production, we'll just use a new connector
// since no reloads of the server code occur
if (Config.nodeEnv === 'production') {
    Knex = KnexConnector(KnexConfig);
}

// Otherwise, hot reload occurs during development
// so let's not instantiate a connector if it already exists
else {
    if (!global.Knex) {
        global.Knex = KnexConnector(KnexConfig);
    }

    Knex = global.Knex;
}