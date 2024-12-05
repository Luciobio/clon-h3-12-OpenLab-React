import React from 'react'
import { Route, Switch } from 'wouter';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Home } from '../sections/Home/Home';
import { CreateInitiative } from '../sections/CreateInitiative/CreateInitiative';
import { NewInitiatives } from '../sections/NewInitiatives/NewInitiatives';
import { Initiatives } from '../sections/Initiatives/Initiatives';

export const Dashboard = () => {
    return (
        <div>
            <Header/>
            <Sidebar />
            <div>
                <main>
                    <Switch>
                        <Route path="/dashboard/home" component={Home} />
                        <Route path="/dashboard/create-new" component={CreateInitiative} />
                        <Route path="/dashboard/new-initiatives" component={NewInitiatives} />
                        <Route path="/dashboard/initiatives" component={Initiatives} />
                    </Switch>
                </main>
            </div>
        </div>
    );
}
