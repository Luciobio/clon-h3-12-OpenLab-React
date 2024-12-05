The issue might stem from how wouter manages routing or how the components are being updated/rendered when navigating between routes. Let’s review and address the potential issues:

Potential Issues and Fixes
Link Behavior in wouter:

Ensure you are using the Link component correctly.
The Link component should directly update the URL and the associated Route component should render the correct page.
Verify that your Link components look like this:

javascript
Copiar código
<Link href="/dashboard/home">Home</Link>
Parent Container Layout:

Ensure that your layout properly separates the Sidebar and main areas. If the Sidebar overlaps the main content, the route change might occur without visually updating the content.
Update the CSS for your layout to ensure Sidebar and main are side-by-side or as intended.

Example CSS for a two-column layout:

css
Copiar código
.dashboard {
  display: flex;
  height: 100vh;
}
.sidebar {
  width: 250px;
  background-color: #333;
  color: #fff;
}
.main {
  flex: 1;
  padding: 20px;
}
Apply these classes to your Dashboard component:

javascript
Copiar código
<div className="dashboard">
  <Sidebar />
  <div className="main">
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
Exact Path Matching:

wouter matches routes by prefix unless exact is specified. This can lead to unexpected behavior if /dashboard is partially matching other routes like /dashboard/home.
Add exact to your Route definitions:

javascript
Copiar código
<Switch>
  <Route path="/dashboard/home" component={Home} />
  <Route path="/dashboard/create-new" component={CreateInitiative} />
  <Route path="/dashboard/new-initiatives" component={NewInitiatives} />
  <Route path="/dashboard/initiatives" component={Initiatives} />
</Switch>
Ensure Sections Are Exported Correctly:

Verify that Home, CreateInitiative, NewInitiatives, and Initiatives are correctly exported and don’t throw runtime errors.
Example:

javascript
Copiar código
export const Home = () => <h1>Home Section</h1>;
export default Home;
CSS Specificity and Visibility:

Ensure the main container or its children (Switch and Route) are visible and not accidentally hidden by CSS.
Check for display: none or overlapping issues using browser developer tools.

Final Updated Components
Dashboard.jsx
javascript
Copiar código
import React from 'react';
import { Route, Switch } from 'wouter';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Home } from '../sections/Home/Home';
import { CreateInitiative } from '../sections/CreateInitiative/CreateInitiative';
import { NewInitiatives } from '../sections/NewInitiatives/NewInitiatives';
import { Initiatives } from '../sections/Initiatives/Initiatives';

import './Dashboard.css'; // Add layout styles

export const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main">
                <Header />
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
};
Sidebar.jsx
javascript
Copiar código
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'wouter';

import logo from './../../../assets/logo.svg';
import homeIcon from './../../../assets/home-icon.svg';
import messageIcon from './../../../assets/message-icon.svg';
import lampChargeIcon from './../../../assets/lamp-charge-icon.svg';
import lampOnIcon from './../../../assets/lamp-on-icon.svg';
import logoutIcon from './../../../assets/logout-icon.svg';

import './Sidebar.css';

export const Sidebar = () => {
  const { logout } = useAuth0();

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="App Logo" className="logo-img" />
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <img src={homeIcon} alt="Home Icon" className="logo-img" />
            <Link href="/dashboard/home">Home</Link>
          </li>
          <li>
            <img src={messageIcon} alt="Create New Icon" className="logo-img" />
            <Link href="/dashboard/create-new">Create New</Link>
          </li>
          <li>
            <img src={lampChargeIcon} alt="New Initiatives Icon" className="logo-img" />
            <Link href="/dashboard/new-initiatives">New Initiatives</Link>
          </li>
          <li>
            <img src={lampOnIcon} alt="Initiatives Icon" className="logo-img" />
            <Link href="/dashboard/initiatives">Initiatives</Link>
          </li>
        </ul>
        <ul>
          <li onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            <img src={logoutIcon} alt="Logout Icon" className="logo-img" />
            <Link href="/logout">Log Out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
Debugging Steps
Inspect the DOM:
Use browser dev tools to confirm the correct Route content is being rendered.
Console Logs:
Add logs inside each Route component to confirm it is being rendered.
If issues persist, let me know so we can debug further!