import type { NextApiRequest, NextApiResponse } from 'next'

import { TwitterClient } from '../../server/utils/twitter';
import { UserDAO } from '../../server/domains/users/userDao';
import { AuthenticationService } from '../../server/services/authenticationService';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const oauthToken = request.query.oauth_token as string;
    const oauthVerifier = request.query.oauth_verifier as string;

    // Exchange the oauth verifier for an access token
    const { user_id, screen_name } = await TwitterClient.basics.oauthAccessToken({
        oauth_verifier: oauthVerifier,
        oauth_token: oauthToken
    } as any);


    // Register the user if not already registered
    const isRegistered = await UserDAO.findUser(user_id)
    if (!isRegistered) {
        await UserDAO.registerUser(user_id, screen_name);
    }

    // Sign them in to set the cookie, then redirect
    AuthenticationService.signIn(user_id, screen_name, response);
    response.redirect('/home');
};