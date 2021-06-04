import { NextApiRequest, NextApiResponse } from 'next';

import { TwitterClient } from '../../server/utils/twitter';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {

    const requestToken = await TwitterClient.basics
        .oauthRequestToken({ oauth_callback: 'http://localhost:3000/api/twitterCallback' });

    response.json({
        oauthToken: requestToken.oauth_token
    });
};

export default handler;