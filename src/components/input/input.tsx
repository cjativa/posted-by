import { ChangeEvent } from 'react';

interface IInputProps {
    value: string,
    placeholder: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    type: string,
};

export const Input = ({ value, placeholder, onChange, type }: IInputProps) => {
    return (
        <div className="mb-3 pt-0">
            <input
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
            />
        </div>
    );
};