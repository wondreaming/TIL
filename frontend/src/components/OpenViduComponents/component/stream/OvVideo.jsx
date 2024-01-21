import { useEffect, useRef } from "react";
import "./StreamComponent.css";

export default function OvVideoComponent(props) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (props.user.streamManager && videoRef.current) {
      console.log("PROPS: ", props);
      props.user.getStreamManager().addVideoElement(videoRef.current);
    }

    if (props.user.streamManager.session && props.user && videoRef.current) {
      props.user.streamManager.session.on("signal:userChanged", (event) => {
        const data = JSON.parse(event.data);
        if (data.isScreenShareActive !== undefined) {
          props.user.getStreamManager().addVideoElement(videoRef.current);
        }
      });
    }
  }, [props]);

  return (
    <video
      autoPlay={true}
      id={"video-" + props.user.getStreamManager().stream.streamId}
      ref={videoRef}
      muted={props.mutedSound}
    />
  );
}
