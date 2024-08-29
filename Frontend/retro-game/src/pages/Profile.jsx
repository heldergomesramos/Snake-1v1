import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

export default function Profile() {
  const { playerData } = useContext(PlayerContext);

  return (
    <div className="container-center">
      <p>Profile</p>
    </div>
  );
}
