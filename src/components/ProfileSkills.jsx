import React from 'react';
import './ProfileSkills.css';

const ProfileSkills = () => {
  const skills = [
    { name: 'React', level: 95, color: '#61dafb' },
    { name: 'JavaScript', level: 90, color: '#f7df1e' },
    { name: 'Node.js', level: 85, color: '#68a063' },
    { name: 'TypeScript', level: 80, color: '#3178c6' },
    { name: 'CSS/SASS', level: 88, color: '#cc6699' },
    { name: 'Python', level: 75, color: '#3776ab' }
  ];

  const badges = [
    { name: 'React Expert', icon: '⚛️', color: '#61dafb' },
    { name: 'Open Source', icon: '🌟', color: '#fbbf24' },
    { name: 'Team Player', icon: '🤝', color: '#10b981' },
    { name: 'Problem Solver', icon: '🧩', color: '#8b5cf6' }
  ];

  return (
    <div className="profile-skills">
      <h2 className="section-title">Skills & Expertise</h2>
      
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <div 
                className="skill-progress" 
                style={{ 
                  width: `${skill.level}%`,
                  background: skill.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="badges-section">
        <h3 className="badges-title">Achievements</h3>
        <div className="badges-grid">
          {badges.map((badge, index) => (
            <div key={index} className="badge-item">
              <span className="badge-icon">{badge.icon}</span>
              <span className="badge-name">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkills;
