import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = () => {
  return (
    <div className="profile-header">
      <div className="cover-photo">
        <div className="cover-overlay"></div>
      </div>
      <div className="profile-info">
        <div className="avatar-container">
          <img 
            src="https://ui-avatars.com/api/?name=John+Doe&size=150&background=6366f1&color=fff&bold=true" 
            alt="Profile Avatar" 
            className="avatar"
          />
          <div className="online-indicator"></div>
        </div>
        <div className="user-details">
          <h1 className="user-name">John Doe</h1>
          <p className="user-title">Full Stack Developer</p>
          <p className="user-location">📍 San Francisco, CA</p>
        </div>
        <div className="profile-actions">
          <button className="btn btn-primary">Follow</button>
          <button className="btn btn-secondary">Message</button>
          <button className="btn btn-icon">⋯</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
