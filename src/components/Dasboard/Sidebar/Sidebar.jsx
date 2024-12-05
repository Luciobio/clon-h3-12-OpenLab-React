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

