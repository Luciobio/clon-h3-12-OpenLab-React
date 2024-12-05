import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Switch } from 'wouter';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Home } from '../sections/Home/Home';
import { CreateInitiative } from '../sections/CreateInitiative/CreateInitiative';
import { NewInitiatives } from '../sections/NewInitiatives/NewInitiatives';
import { Initiatives } from '../sections/Initiatives/Initiatives';
import LogOut from '../LogOut/LogOut';

export const Dashboard = () => {
    const { logout } = useAuth0();

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Header/>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <main style={{ flex: 1, padding: '20px' }}>
                    <Switch>
                        <Route path="/dashboard/home" component={Home} />
                        <Route path="/dashboard/create-new" component={CreateInitiative} />
                        <Route path="/dashboard/new-initiatives" component={NewInitiatives} />
                        <Route path="/dashboard/initiatives" component={Initiatives} />
                    </Switch>
                    <LogOut />
                </main>
            </div>
        </div>
    );
}
