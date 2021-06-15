
export const Config = {
    twitterApiKey: process.env.TWITTER_API_KEY!,
    twitterApiSecretKey: process.env.TWITTER_API_SECRET_KEY!,

    twitterAccessToken: process.env.TWITTER_API_ACCESS_TOKEN!,
    twitterAccessTokenSecret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET!,
    twitterBearerToken: process.env.TWITTER_API_BEARER_TOKEN!,

    databaseHost: process.env.DATABASE_HOST!,
    databaseName: process.env.DATABASE_NAME!,
    databaseUser: process.env.DATABASE_USER!,
    databasePassword: process.env.DATABASE_PASSWORD!,

    jwtSecret: process.env.JWT_SECRET!,
};