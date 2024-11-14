// src/pages/dashboard/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { sendMissileLaunch, connectSocket } from "../../socket/webSocket";

const Dashboard: React.FC = () => {
  const [missileData, setMissileData] = useState("");

  useEffect(() => {
    connectSocket();
  }, []);

  const handleLaunchMissile = () => {
    sendMissileLaunch({ target: missileData });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Defense Dashboard</h1>
      <input
        type="text"
        placeholder="Enter missile target"
        value={missileData}
        onChange={(e) => setMissileData(e.target.value)}
      />
      <button onClick={handleLaunchMissile}>Launch Missile</button>
    </div>
  );
};

export default Dashboard;
