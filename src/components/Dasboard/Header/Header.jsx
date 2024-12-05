import React from 'react'
import './Header.css'

export const Header = () => {
  return (
    <header className="header">
      <div className="left-section"></div>
      <div className="right-section">
        <div id="wallet-icon" className="wallet">
          <div>
            <img src="assets/wallet-2.svg" alt="Wallet" className="logo-img" />
          </div>
          {/* Pass visibility state and handle close event */}
          {/* <app-wallet-connect
              [isVisible]="isWalletModalVisible"
              (close)="closeWalletModal()"
            ></app-wallet-connect> */}
        </div>
        <a href="/dashboard/profile" className="user">
          <img src="assets/user-icon.svg" alt="User" className="logo-img" />
          <span /* *ngIf="user$ | async as user" */ className="user-name">
            {/* {{ user.name ? user.name : 'User Name' }} */} user name
          </span>
        </a>
      </div >
    </header >
  )
}
