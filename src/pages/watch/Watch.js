import React from "react";
import "./Watch.scss";
import { ArrowBackOutlined } from "@material-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trailer } = location.state;
  return (
    <div className="watch">
      <div className="back" onClick={(e) => navigate(-1)}>
        <ArrowBackOutlined />
        Home
      </div>

      <video
        src={trailer}
        className="video"
        autoPlay
        progress="true"
        controls
      ></video>
    </div>
  );
};

export default Watch;
