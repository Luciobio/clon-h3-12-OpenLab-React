import React from 'react'
import tuki from './../../../assets/tuki.svg'
import './Home.css'
import { useAuth0 } from "@auth0/auth0-react";

export const Home = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user)

  return (
    <div className="user-profile">
      <section className="user-header">
        <div className="user-card">
          <img className="user-picture" src={user.picture} alt="User Picture" />
          <div className="user-data">
            <span className="user-name">{user.name ? user.name : 'User Name'}</span>
            <span className="user-email">{user.email ? user.email : 'User Email'}</span>
          </div>
        </div>
        <div className="user-description-cont">
          <p className="user-description">
            Lorem ipsum dolor sit amet consectetur. Sit aenean enim blandit commodo lorem vivamus tellus nec.
            At id molestie turpis posuere sed odio dui gravida. Interdum turpis nunc id in eros pulvinar id pharetra cum.
            Quis adipiscing.
          </p>
        </div>
      </section>
      <div className="div2 wallet-balance">Estimated balance</div>
      <div className="div3 user-highlights">
        <div className="highlight-item">
          <img src={ tuki } alt="Logo" className="tuki" />
          <span>Co-founder at Fractal</span>
        </div>
        <div className="highlight-item">
          <img src={ tuki } alt="Logo" className="tuki" />
          <span>Workspace owner at Shared</span>
        </div>
        <div className="highlight-item">
          <img src={ tuki } alt="Logo" className="tuki" />
          <span>Collaborator at Easymed</span>
        </div>
      </div>
      <div className="div4">Crypto Details</div>
      <div className="div5 user-stats">
        <div className="stat">
          <span className="stat-name">Founded projects</span>
          <div className="stat-value">123</div>
        </div>
        <div className="stat">
          <span className="stat-name">Participated projects</span>
          <div className="stat-value">123</div>
        </div>
        <div className="stat">
          <span className="stat-name">Solved missions</span>
          <div className="stat-value">123</div>
        </div>
        <div className="stat">
          <span className="stat-name">Validated missions</span>
          <div className="stat-value">123</div>
        </div>
        <div className="stat">
          <span className="stat-name">Likes per mission</span>
          <div className="stat-value">123</div>
        </div>
        <div className="stat">
          <span className="stat-name">Generated tokens</span>
          <div className="stat-value">123</div>
        </div>
      </div>
    </div>
  )
}
