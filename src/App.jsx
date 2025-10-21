import React from 'react';
import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import ProfileAbout from './components/ProfileAbout';
import ProfileSkills from './components/ProfileSkills';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <ProfileHeader />
        <ProfileStats />
        <div className="content-grid">
          <div className="main-content">
            <ProfileAbout />
            <ProfileSkills />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
