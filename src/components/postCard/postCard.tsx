import { useEffect, useState } from 'react';
import { IThread } from '../../../shared/thread';

interface IPostCardProps {
    post: IThread,
}

export const PostCard = ({ post }: IPostCardProps) => {

    const [shortDescription, setShortDescription] = useState('');

    // Capitalize the first letter in the title
    const title = `${post.title.charAt(0).toUpperCase()}${post.title.slice(1)}`;

    useEffect(() => {

        // Set up the short description by starting it where the title ends
        if (post.thread_posts) {
            const initialTweet = post.thread_posts[0].text;

            const titleEnd = initialTweet.indexOf(title) + title.length;
            const description = initialTweet
                .substring(titleEnd)
                // .replaceAll('\n', '. ');
            setShortDescription(description);
        }
    }, []);



    return (
        <div className={``}>

            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg lg:w-80 shadow-lg">
                <div className={`lg:h-48 md:h-36 w-full bg-${post.theme_color}-400`} />

                {/* <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src="https://dummyimage.com/720x400"
                    alt="blog"
                /> */}

                <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        {post.created_at}
                    </h2>

                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title}
                    </h1>

                    <p className="leading-relaxed mb-3">
                        {shortDescription}
                    </p>

                    {/* <div className="flex items-center flex-wrap ">
                        <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                            Learn More
                        </a>

                        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>1.2K
                        </span>
                    </div> */}

                </div>
            </div>
        </div>
    );
};