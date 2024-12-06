import React from 'react';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { useAuth0 } from "@auth0/auth0-react";

export const Dashboard = ({ children }) => {

    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header user={user} isAuthenticated={isAuthenticated} />
            <Sidebar />

            {/* Main Content Area */}
            <div className="dashboard-content">
                <main>
                    {React.cloneElement(children, { user, isAuthenticated })}
                </main>
            </div>
        </>
    );
};
