import React, { useState } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";
import MicOff from "@mui/icons-material/MicOff";
import VideocamOff from "@mui/icons-material/VideocamOff";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOff from "@mui/icons-material/VolumeOff";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import HighlightOff from "@mui/icons-material/HighlightOff";
import FormHelperText from "@mui/material/FormHelperText";

export default function StreamComponent(props) {
  const [nickname, setNickname] = useState(props.user.getNickname());
  const [showForm, setShowForm] = useState(false);
  const [mutedSound, setMutedSound] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const handleChange = (event) => {
    setNickname(event.target.value);
  };

  const toggleNicknameForm = () => {
    if (props.user.isLocal()) {
      setShowForm(!showForm);
    }
  };

  const toggleSound = () => {
    setMutedSound(!mutedSound);
  };

  const handlePressKey = (event) => {
    if (event.key === "Enter") {
      if (nickname.length >= 3 && nickname.length <= 20) {
        props.handleNickname(nickname);
        toggleNicknameForm();
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  };

  return (
    <div className="OT_widget-container">
      <div className="pointer nickname">
        {showForm ? (
          <FormControl id="nicknameForm">
            <IconButton color="inherit" id="closeButton" onClick={toggleNicknameForm}>
              <HighlightOff />
            </IconButton>
            <InputLabel htmlFor="name-simple" id="label">
              Nickname
            </InputLabel>
            <Input
              color="inherit"
              id="input"
              value={nickname}
              onChange={handleChange}
              onKeyPress={handlePressKey}
              required
            />
            {!isFormValid && nickname.length <= 3 && (
              <FormHelperText id="name-error-text">Nickname is too short!</FormHelperText>
            )}
            {!isFormValid && nickname.length >= 20 && (
              <FormHelperText id="name-error-text">Nickname is too long!</FormHelperText>
            )}
          </FormControl>
        ) : (
          <div onClick={toggleNicknameForm}>
            <span id="nickname">{props.user.getNickname()}</span>
            {props.user.isLocal() && <span id=""> (edit)</span>}
          </div>
        )}
      </div>

      {props.user && props.user.getStreamManager() ? (
        <div className="streamComponent">
          <OvVideoComponent user={props.user} mutedSound={mutedSound} />
          <div id="statusIcons">
            {!props.user.isVideoActive() ? (
              <div id="camIcon">
                <VideocamOff id="statusCam" />
              </div>
            ) : null}

            {!props.user.isAudioActive() ? (
              <div id="micIcon">
                <MicOff id="statusMic" />
              </div>
            ) : null}
          </div>
          <div>
            {!props.user.isLocal() && (
              <IconButton id="volumeButton" onClick={toggleSound}>
                {mutedSound ? <VolumeOff color="secondary" /> : <VolumeUp />}
              </IconButton>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
