import React from "react";
import { Link } from 'react-router-dom';
import { useContext } from "react";

import { UserContext } from '../UserContext';

export default function MainMenu() {
  const { username } = useContext(UserContext);
  return (
    <div className="container-center">
      <p className="section__text__p2">Welcome, { username }</p>
      <p className="title gradient-text">Pick your poison</p>
      <br /><br />
      <div className="btn-container">
        <Link to="/create-private-game">
          <button className="button-default">Create Private Game</button>
        </Link>
        <Link to="/join-private-game">
          <button className="button-default">Join Private Game</button>
        </Link>
        <Link to="/public-queue">
          <button className="button-default">Join Public Game</button>
        </Link>
        <Link to="/play-vs-ai">
          <button className="button-default">Play vs AI</button>
        </Link>
      </div>
    </div>
  );
}
