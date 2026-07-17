import React from 'react';
import '../styles/Rewards.css';

const leaderboard = [
  { name: "Greeshma", points: 1000, level: 2, badges: [{ icon: "🩸" }] },
  { name: "Vineeth", points: 500, level: 2, badges: [{ icon: "🩸" }] },
  { name: "Chandana", points: 200, level: 1, badges: [{ icon: "🩸" }] },
  { name: "Rahul", points: 180, level: 1, badges: [{ icon: "🩸" }] },
  { name: "Priya", points: 160, level: 1, badges: [{ icon: "🩸" }] },
  { name: "Arjun", points: 140, level: 1, badges: [{ icon: "🩸" }] },
  { name: "Keerthana", points: 120, level: 1, badges: [{ icon: "🩸" }] },
  { name: "Sai Kiran", points: 100, level: 1, badges: [{ icon: "🩸" }] },
  { name: "Meghana", points: 80, level: 1, badges: [{ icon: "🩸" }] },
  { name: "Harsha", points: 60, level: 1, badges: [{ icon: "🩸" }] }
];

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>🏆 Top Life Savers</h1>
        <p>Honoring our most dedicated donors who are making a difference every day.</p>
      </div>

      <div className="leaderboard-list">
        {leaderboard.map((user, index) => (
          <div key={index} className={`leaderboard-item rank-${index + 1}`}>
            <div className="rank-badge">
              {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
            </div>

            <div className="user-info">
              <div className="user-avatar">
                {user.name.charAt(0)}
              </div>

              <div className="user-details">
                <h3>{user.name}</h3>

                <div className="user-badges">
                  {user.badges.map((badge, i) => (
                    <span key={i} className="badge-mini">
                      {badge.icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-value">{user.points}</span>
                <span className="stat-label">POINTS</span>
              </div>

              <div className="stat-item">
                <span className="stat-value">Lv. {user.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;