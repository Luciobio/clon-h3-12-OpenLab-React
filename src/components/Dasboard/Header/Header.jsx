import React from "react";
import walletIcon from "../../../assets/wallet-2.svg";
import userIcon from "../../../assets/user-icon.svg";
import { useWalletConnect } from "../../../context/wallet-connect-context"; // Ajusta la ruta

import "./Header.css";

export const Header = ({ user, isAuthenticated }) => {
  const { open, connectWallet, disconnectWallet, isConnected, userData } = useWalletConnect();

  return (
    <header className="header">
      <div className="left-section"></div>
      <div className="right-section">
        <div
          id="wallet-icon"
          className="wallet"
          onClick={() => connectWallet(null)} // Ejecuta la conexión al hacer clic
        >
          <img src={walletIcon} alt="Wallet" className="logo-img" />
        </div>
        <a href="/dashboard/home" className="user">
          <img src={userIcon} alt="User" className="logo-img" />
          <span className="user-name">
            {isAuthenticated ? user.name : "Guest"}
          </span>
        </a>
      </div>
    </header>
  );
};
