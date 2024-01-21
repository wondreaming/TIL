import React from "react";
import VideoRoomComponent from "../OpenViduComponents/component/VideoRoomComponent";
import { createRoot } from "react-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <div className="h-screen">
    <VideoRoomComponent />
  </div>
);
