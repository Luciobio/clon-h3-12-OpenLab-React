import React from 'react';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

export const Dashboard = ({ children }) => {
    return (
        <div className="dashboard-container">
            {/* Header */}
            <Header />

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="dashboard-content">
                <main>{children}</main>
            </div>
        </div>
    );
};
