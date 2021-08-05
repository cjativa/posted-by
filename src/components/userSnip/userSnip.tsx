import { Avatar } from '../avatar/avatar';

interface IUserSnipProps {
    imageUrl: string,
    handle: string,
    name: string,
};

export const UserSnip = ({ imageUrl, handle, name }: IUserSnipProps) => {



    return (
        < div className="grid grid-cols-1" >
            <div className="w-24 h-24 relative mb-4">
                <Avatar
                    imageSrc={imageUrl}
                    alt={`Profile image for ${handle}`}
                />
            </div>

            <p className="font-bold">{name}</p>
            <span>@{handle}</span>
        </div >
    );
};