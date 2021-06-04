import KnexConnector from 'knex';

import { KnexConfig } from '../utils/knexfile';

export const Knex = KnexConnector(KnexConfig);