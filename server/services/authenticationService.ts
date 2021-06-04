import jsonwebtoken from 'jsonwebtoken';
import { NextApiResponse } from 'next';
import nookies from 'nookies';

import { Config } from '../utils/config';

// 1 day for the token and cookie
const TOKEN_TTL = '1d';
const COOKIE_TTL = 1 * 86400 * 1000;

export class AuthenticationService {

    private static generateJwt(uid: string, handle: string) {
        return jsonwebtoken.sign({ uid, handle },
            Config.jwtSecret,
            { expiresIn: TOKEN_TTL },
        )
    };

    public static signIn(uid: string, handle: string, response: NextApiResponse) {
        const jwt = this.generateJwt(uid, handle);
        const expires = new Date(Date.now() + COOKIE_TTL);

        // Set the server cookie
        nookies.set({ res: response },
            'postbyServerCookie',
            jwt,
            {
                httpOnly: true,
                expires: expires,
                path: '/'
            }
        );

        const clientPayload = JSON.stringify({
            expires: expires.getTime(),
        });

        // Set the client cookie
        nookies.set({ res: response },
            'postbyClientCookie',
            clientPayload,
            {
                httpOnly: false,
                expires,
                path: '/',
            }
        );
    };
};