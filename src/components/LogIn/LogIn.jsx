import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import logo from './../../assets/OpenLab_Logo.png';

export const LogIn = () => {
    const { loginWithRedirect } = useAuth0();
    console.log(loginWithRedirect);

    return (
        <div>
            <img src={logo} alt='Openlab Logo'/>
            <h1>Openlab</h1>
            <button onClick={() => loginWithRedirect()}>Log In</button>
        </div>
    )
}