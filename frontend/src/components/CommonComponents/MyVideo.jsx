import React from "react";
import OpenViduVideoComponent from "../OpenViduComponents/OepnVidu";

const UserVideoComponent = (props) => {
  const getNicknameTag = () => {
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div className="userName bg-gray-200 px-2 py-1 font-bold rounded-br-2xl">
            <p>{getNicknameTag()}</p>
            <button className="cursor-pointer">음소거</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
