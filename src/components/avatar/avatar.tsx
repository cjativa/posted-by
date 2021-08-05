
interface IAvatarProps {
    imageSrc: string,
    alt?: string,
    size?: 4 | 6 | 8 | 10 | 12,
};

export const Avatar = ({ imageSrc, alt = '', size, }: IAvatarProps) => {

    const w = (size)
        ? `w-${size}`
        : `w-full`;
    const h = (size)
        ? `h-${size}`
        : 'h-full';

    return (
        <div className={`group ${w} ${h} rounded-full overflow-hidden shadow-inner`}>
            <img
                src={imageSrc}
                alt={alt}
                className="object-cover object-center w-full h-full visible group-hover:hidden"
            />
        </div>
    );
};