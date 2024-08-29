import React from "react";
import { Link } from "react-router-dom";

export default function PublicQueue() {
  return (
    <div className="container-center">
      <p className="title gradient-text title-section">
        Waiting for a player...
      </p>
      <br />
      <br />
      <div className="btn-container">
        <Link to="/main-menu">
          <button className="button-default button-height-less">Leave</button>
        </Link>
      </div>
    </div>
  );
}
