import React from 'react'
import walletIcon from '../../../assets/wallet-2.svg'
import userIcon from '../../../assets/user-icon.svg'

import './Header.css'

export const Header = ({ user, isAuthenticated }) => {
  return (
    <header className="header">
      <div className="left-section"></div>
      <div className="right-section">
        <div id="wallet-icon" className="wallet">
          <div>
            <img src={walletIcon} alt="w" className="logo-img" />
          </div>
          {/* Pass visibility state and handle close event */}
          {/* <app-wallet-connect
              [isVisible]="isWalletModalVisible"
              (close)="closeWalletModal()"
            ></app-wallet-connect> */}
        </div>
        <a href="/dashboard/home" className="user">
          <img src={userIcon} alt="User" className="logo-img" />
          <span className="user-name">
            {isAuthenticated? user.name : 'Guest'}
          </span>
        </a>
      </div >
    </header >
  )
}
