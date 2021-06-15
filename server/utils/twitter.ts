import { TwitterClient as Twitter } from 'twitter-api-client';

import { Config } from './config';

export const TwitterClient = new Twitter({
    apiKey: Config.twitterApiKey,
    apiSecret: Config.twitterApiSecretKey,
    accessToken: Config.twitterAccessToken,
    accessTokenSecret: Config.twitterAccessTokenSecret,
});

export const TWITTER_API_URL = 'https://api.twitter.com';