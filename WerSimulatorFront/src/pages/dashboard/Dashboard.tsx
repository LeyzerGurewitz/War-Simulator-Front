import React, { useEffect, useState } from "react";
import { sendMissileLaunch, connectSocket } from "../../socket/webSocket";

const Dashboard: React.FC = () => {
  const [missileData, setMissileData] = useState("");
  const [message, setMessage] = useState("");  // מצב לאחסון ההודעות

  useEffect(() => {
    connectSocket((msg: string) => {
      setMessage(msg);  // עדכון ההודעה המתקבלת
    });
  }, []);

  const handleLaunchMissile = () => {
    sendMissileLaunch({ target: missileData });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Defense Dashboard</h1>
      <select
        value={missileData}
        onChange={(e) => setMissileData(e.target.value)}
      >
        <option value="">בחר יעד</option>
        <option value="Target1">יעד 1</option>
        <option value="Target2">יעד 2</option>
        <option value="Target3">יעד 3</option>
        {/* אפשר להוסיף עוד אפשרויות כאן */}
      </select>
      <button onClick={handleLaunchMissile}>Launch Missile</button>
      <p>{message}</p> {/* הצגת ההודעה */}
    </div>
  );
};

export default Dashboard;
