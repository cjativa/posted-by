import { useEffect, useState } from 'react';

import { IThread } from '../../../shared/thread';
import { Avatar } from '../avatar/avatar';

interface IPostCardProps {
    post: IThread,
    link: string,

    authorHandle?: string,
    authorName?: string,
    authorImageUrl?: string,
}

const lineStyle = {
    borderTop: '1px solid red',
    width: '60%',
    height: '2px',
    marginLeft: '10px',
};

export const PostCard = ({ post, link, authorImageUrl, authorHandle, authorName, }: IPostCardProps) => {

    const [shortDescription, setShortDescription] = useState('');
    const [shortDate, setShortDate] = useState('');

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

        // Make the date into a short format like "April 21, 2021"
        const date = new Date(post.created_at);
        const month = date.toLocaleString('default', { month: 'long' });
        const dateFormatted = `${month} ${date.getDate()}, ${date.getFullYear()}`;

        setShortDate(dateFormatted);

    }, []);



    return (
        <div className={``}>

            <div className="flex flex-col h-full border-2 border-gray-200 border-opacity-60 rounded-lg lg:w-80 shadow-lg">

                {/** Upper section - color cover */}
                <div className={`lg:h-48 md:h-36 w-full bg-${post.theme_color}-400`} />

                {/** Bottom section */}
                <a href={link} className="p-6 cursor-pointer block flex-grow">
                    <div className="flex flex-col h-full">
                        <div className="flex flex-row items-center mb-4">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                                Category
                            </h2>
                            <hr style={lineStyle} />
                        </div>

                        <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                            {title}
                        </h1>

                        <p className="leading-relaxed mb-3 flex-grow">
                            {shortDescription}
                        </p>

                        <div className="flex flex-row gap-x-4 justify-between">
                            <span className="tracking-widest text-xs title-font font-medium text-gray-400 self-end">
                                {shortDate}
                            </span>
                            {authorImageUrl && authorHandle && authorName &&
                                <div className="inline-flex gap-x-2">
                                    <Avatar
                                        imageSrc={authorImageUrl}
                                        size={10}
                                    />

                                    <div className="self-end">
                                        <p className="font-bold text-sm">{authorName}</p>
                                        <p className="text-sm">@{authorHandle}</p>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </a>
            </div>
        </div >
    );
};