import React from 'react';

interface IUserLayoutProps {
    children: React.ReactNode,
};

export const UserLayout = ({ children }: IUserLayoutProps) => {

    return (
        <div className="flex flex-col items-center py-8 bg-blue-50 h-full">
            {children}
        </div>
    );
};