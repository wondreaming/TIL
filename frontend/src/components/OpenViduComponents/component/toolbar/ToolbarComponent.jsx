import React, { useState } from "react";
import "./ToolbarComponent.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import Videocam from "@mui/icons-material/Videocam";
import VideocamOff from "@mui/icons-material/VideocamOff";
import Fullscreen from "@mui/icons-material/Fullscreen";
import FullscreenExit from "@mui/icons-material/FullscreenExit";
import SwitchVideoIcon from "@mui/icons-material/SwitchVideo";
import PictureInPicture from "@mui/icons-material/PictureInPicture";
import ScreenShare from "@mui/icons-material/ScreenShare";
import StopScreenShare from "@mui/icons-material/StopScreenShare";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";

const logo = require("../../assets/images/openvidu_logo.png");

export default function ToolbarComponent(props) {
  const [fullscreen, setFullscreen] = useState(false);

  const micStatusChanged = () => {
    props.micStatusChanged();
  };

  const camStatusChanged = () => {
    props.camStatusChanged();
  };

  const screenShare = () => {
    props.screenShare();
  };

  const stopScreenShare = () => {
    props.stopScreenShare();
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    props.toggleFullscreen();
  };

  const switchCamera = () => {
    props.switchCamera();
  };

  const leaveSession = () => {
    props.leaveSession();
  };

  const toggleChat = () => {
    props.toggleChat();
  };

  const mySessionId = props.sessionId;
  const localUser = props.user;

  return (
    <AppBar className="toolbar" id="header">
      <Toolbar className="toolbar">
        <div id="navSessionInfo">
          <img id="header_img" alt="OpenVidu Logo" src={logo} />

          {props.sessionId && (
            <div id="titleContent">
              <span id="session-title">{mySessionId}</span>
            </div>
          )}
        </div>

        <div className="buttonsContent">
          <IconButton
            color="inherit"
            className="navButton"
            id="navMicButton"
            onClick={micStatusChanged}
          >
            {localUser !== undefined && localUser.isAudioActive() ? (
              <Mic />
            ) : (
              <MicOff color="secondary" />
            )}
          </IconButton>

          <IconButton
            color="inherit"
            className="navButton"
            id="navCamButton"
            onClick={camStatusChanged}
          >
            {localUser !== undefined && localUser.isVideoActive() ? (
              <Videocam />
            ) : (
              <VideocamOff color="secondary" />
            )}
          </IconButton>

          <IconButton color="inherit" className="navButton" onClick={screenShare}>
            {localUser !== undefined && localUser.isScreenShareActive() ? (
              <PictureInPicture />
            ) : (
              <ScreenShare />
            )}
          </IconButton>

          {localUser !== undefined && localUser.isScreenShareActive() && (
            <IconButton onClick={stopScreenShare} id="navScreenButton">
              <StopScreenShare color="secondary" />
            </IconButton>
          )}

          <IconButton color="inherit" className="navButton" onClick={switchCamera}>
            <SwitchVideoIcon />
          </IconButton>
          <IconButton color="inherit" className="navButton" onClick={toggleFullscreen}>
            {localUser !== undefined && fullscreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
          <IconButton
            color="secondary"
            className="navButton"
            onClick={leaveSession}
            id="navLeaveButton"
          >
            <PowerSettingsNew />
          </IconButton>
          <IconButton color="inherit" onClick={toggleChat} id="navChatButton">
            {props.showNotification && <div id="point" className="" />}
            <Tooltip title="Chat">
              <QuestionAnswer />
            </Tooltip>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
