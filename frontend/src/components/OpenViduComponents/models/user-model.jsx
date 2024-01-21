class UserModel {
  constructor() {
    this.state = {
      connectionId: "",
      audioActive: true,
      videoActive: true,
      screenShareActive: false,
      nickname: "",
      streamManager: null,
      type: "local",
    };
  }

  isAudioActive() {
    return this.state.audioActive;
  }

  isVideoActive() {
    return this.state.videoActive;
  }

  isScreenShareActive() {
    return this.state.screenShareActive;
  }

  getConnectionId() {
    return this.state.connectionId;
  }

  getNickname() {
    return this.state.nickname;
  }

  getStreamManager() {
    return this.state.streamManager;
  }

  isLocal() {
    return this.state.type === "local";
  }

  isRemote() {
    return !this.isLocal();
  }

  setAudioActive(isAudioActive) {
    this.setState({ audioActive: isAudioActive });
  }

  setVideoActive(isVideoActive) {
    this.setState({ videoActive: isVideoActive });
  }

  setScreenShareActive(isScreenShareActive) {
    this.setState({ screenShareActive: isScreenShareActive });
  }

  setStreamManager(streamManager) {
    this.setState({ streamManager: streamManager });
  }

  setConnectionId(connectionId) {
    this.setState({ connectionId: connectionId });
  }

  setNickname(nickname) {
    this.setState({ nickname: nickname });
  }

  setType(type) {
    if (type === "local" || type === "remote") {
      this.setState({ type: type });
    }
  }
}

export default UserModel;
