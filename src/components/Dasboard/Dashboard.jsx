import React from 'react';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { useAuth0 } from "@auth0/auth0-react";
import { WalletConnectProvider } from "../../context/wallet-connect-context";
import './Dashboard.css';

export const Dashboard = ({ children }) => {

    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='dashboard'>
            <Sidebar />
            <div>
                <WalletConnectProvider>
                    <Header user={user} isAuthenticated={isAuthenticated} />
                </WalletConnectProvider>
                <div className="main-content">
                    {React.cloneElement(children, { user, isAuthenticated })}
                </div>
            </div>
        </div>
    );
};
