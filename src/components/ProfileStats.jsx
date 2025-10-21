import React from 'react';
import './ProfileStats.css';

const ProfileStats = () => {
  const stats = [
    { label: 'Posts', value: '245', icon: '📝' },
    { label: 'Followers', value: '12.5K', icon: '👥' },
    { label: 'Following', value: '1,234', icon: '➕' },
    { label: 'Likes', value: '45.2K', icon: '❤️' }
  ];

  return (
    <div className="profile-stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <span className="stat-icon">{stat.icon}</span>
          <div className="stat-content">
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;
