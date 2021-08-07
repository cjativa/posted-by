import React from 'react';

import { NavigationBar } from '../../../components/navigationBar/navigationBar';

interface IUserLayoutProps {
    children: React.ReactNode,
};

export const UserLayout = ({ children }: IUserLayoutProps) => {

    return (
        <div className="">
            <NavigationBar />
            <div className="flex flex-col items-center py-8 bg-blue-50 h-full">
                {children}
            </div>
        </div>
    );
};