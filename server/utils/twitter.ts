import { TwitterClient as Twitter } from 'twitter-api-client';

import { Config } from './config';

export const TwitterClient = new Twitter({
    apiKey: Config.twitterApiKey,
    apiSecret: Config.twitterApiSecretKey,
    accessToken: '284267911-KJVduJaEzWShj14gZNWNhFsKIyBeUc7tkYvgipdX',
    accessTokenSecret: 'UpbeLuVGIhwMkZiDNfMQfQDo3362ieKxHxOGl5iyUUvEc',
});