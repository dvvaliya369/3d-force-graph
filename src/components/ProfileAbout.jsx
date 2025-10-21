import React from 'react';
import './ProfileAbout.css';

const ProfileAbout = () => {
  return (
    <div className="profile-about">
      <h2 className="section-title">About Me</h2>
      <p className="about-text">
        Passionate Full Stack Developer with 5+ years of experience building scalable web applications. 
        I love creating beautiful, functional, and user-friendly interfaces. Always learning and exploring 
        new technologies to stay at the forefront of web development.
      </p>
      
      <div className="info-grid">
        <div className="info-item">
          <span className="info-icon">💼</span>
          <div className="info-content">
            <p className="info-label">Works at</p>
            <p className="info-value">Tech Innovations Inc.</p>
          </div>
        </div>
        
        <div className="info-item">
          <span className="info-icon">🎓</span>
          <div className="info-content">
            <p className="info-label">Studied at</p>
            <p className="info-value">Stanford University</p>
          </div>
        </div>
        
        <div className="info-item">
          <span className="info-icon">🏠</span>
          <div className="info-content">
            <p className="info-label">Lives in</p>
            <p className="info-value">San Francisco, California</p>
          </div>
        </div>
        
        <div className="info-item">
          <span className="info-icon">🌐</span>
          <div className="info-content">
            <p className="info-label">Website</p>
            <p className="info-value">
              <a href="https://johndoe.dev" target="_blank" rel="noopener noreferrer">
                johndoe.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
