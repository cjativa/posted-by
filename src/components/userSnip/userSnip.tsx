import { Avatar } from '../avatar/avatar';

interface IUserSnipProps {
    imageUrl: string,
    handle: string,
    name: string,
    orientation?: 'portrait' | 'landscape',
};

export const UserSnip = ({ imageUrl, handle, name, orientation = 'landscape' }: IUserSnipProps) => {

    if (orientation === 'portrait') {
        return (
            <div className="grid grid-cols-1" >
                <div className="w-24 h-24 relative mb-4">
                    <Avatar
                        imageSrc={imageUrl}
                        alt={`Profile image for ${handle}`}
                    />
                </div>

                <p className="font-bold">{name}</p>
                <span>@{handle}</span>
            </div>
        );
    }

    return (
        <div className="flex flex-row items-end gap-x-4">
            <Avatar
                imageSrc={imageUrl}
                alt={`Profile image for ${handle}`}
                size={16}
            />


            <div className="flex flex-col justify-between">
                <p className="">{name}</p>
                <a href={`/${handle}`} className="text-blue-400">@{handle}</a>
            </div>
        </div >
    );
};