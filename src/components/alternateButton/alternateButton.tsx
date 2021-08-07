
interface IAlternateButtonProps {
    children: React.ReactNode,
    style: 'primary' | 'secondary',
    onClick: () => void,
};

export const AlternateButton = ({ children, style, onClick }: IAlternateButtonProps) => {

    let color: string;

    if (style === 'primary') {
        color = 'bg-red-100';
    }

    else {
        color = 'bg-white-100';
    }

    return (
        <button className={`flex justify-center py-4 px-4 ${color} my-4 cursor-pointer rounded`} onClick={onClick}>
            {children}
        </button>
    );
};