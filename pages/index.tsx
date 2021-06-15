import Head from 'next/head'
import useAxios from 'axios-hooks';

import { Button } from '../src/components/button/button';

export default function Home() {

  const [_, request] = useAxios({}, { manual: true });

  const onSignIn = async () => {
    const { data } = await request({ url: 'twitter' });

    // Redirect them to Twitter to finish authenticating
    window.open(`https://api.twitter.com/oauth/authenticate?oauth_token=${data.oauthToken}`,
      '_blank');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen p-8">

      <Head>
        <title>Posts By</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center h-4/5">
        <h1 className="text-5xl my-2">
          A party for all of your posts 🎉
        </h1>

        <div className="my-10 grid grid-rows-2 gap-y-6">
          <p className="text-xl">
            Share your tips, thoughts, and ideas, <span className="font-semibold">from one simple page.</span>
          </p>

          <p className="text-xl">
            <span className="font-semibold">Posts.by</span> is a one-stop hub for your everyone to find and read your awesome content.
          </p>
        </div>

        <div className="my-4">
          <Button
            style={'primary'}
            onClick={onSignIn}
          >
            Sign in with Twitter
          </Button>

        </div>

      </main>

      <footer className="h-1/5 flex flex-col justify-center items-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Zerochass
        </a>
      </footer>
    </div>
  )
}
