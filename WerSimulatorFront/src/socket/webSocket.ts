
import { io } from "socket.io-client";

const BASE_URL =  import.meta.env.VITE_BASE_URL; 

const socket = io(BASE_URL); 

export const connectSocket = () => {
  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
  });

  socket.on("missile-launched", (data) => {
    console.log("Missile launched: ", data);
    
  });

  socket.on("missile-inAir", (data) => {
    console.log("Missile in air: ", data);
    
  });

  socket.on("missile-hit", (data) => {
    console.log("Missile hit: ", data);
    
  });
};

export const sendMissileLaunch = (missileData: any) => {
  socket.emit("launchMissile", missileData);  
};
