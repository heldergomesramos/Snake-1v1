import React from "react";

import keyboardW from "../assets/images/Keyboard-W.png";
import keyboardA from "../assets/images/Keyboard-A.png";
import keyboardS from "../assets/images/Keyboard-S.png";
import keyboardD from "../assets/images/Keyboard-D.png";
import keyboardUp from "../assets/images/Keyboard-Up.png";
import keyboardLeft from "../assets/images/Keyboard-Left.png";
import keyboardDown from "../assets/images/Keyboard-Down.png";
import keyboardRight from "../assets/images/Keyboard-Right.png";
import keyboardSpace from "../assets/images/Keyboard-Space.png";

import redApple from "../assets/images/Apple-Red.png";
import redAppleRot from "../assets/images/Apple-Red-Rot.png";
import goldenApple from "../assets/images/Apple-Golden.png";
import goldenAppleRot from "../assets/images/Apple-Golden-Rot.png";

export const HowToPlayOverlay = ({ setGuide }) => {
  return (
    <div className="overlay">
      <div className="htp-overlay-content border-gradient-normal">
        {/* Guide Container */}
        <div className="htp-guide-container">
          <div className="htp-section">
            <p className="htp-section-title gradient-text">Controls</p>
            <br />
            {/* WASD Keys Row */}
            <div className="controls-row">
              <img
                src={keyboardW}
                alt="W key"
                className="control-key pixel-art"
              />
              <img
                src={keyboardA}
                alt="A key"
                className="control-key pixel-art"
              />
              <img
                src={keyboardS}
                alt="S key"
                className="control-key pixel-art"
              />
              <img
                src={keyboardD}
                alt="D key"
                className="control-key pixel-art"
              />
            </div>
            {/* Arrow Keys Row */}
            <div className="controls-row">
              <img
                src={keyboardUp}
                alt="Up key"
                className="control-key pixel-art"
              />
              <img
                src={keyboardLeft}
                alt="Left key"
                className="control-key pixel-art"
              />
              <img
                src={keyboardDown}
                alt="Down key"
                className="control-key pixel-art"
              />
              <img
                src={keyboardRight}
                alt="Right key"
                className="control-key pixel-art"
              />
            </div>
            <p>Control Snake</p>

            <br />

            {/* Space Key Row */}
            <div className="controls-row">
              <img
                src={keyboardSpace}
                alt="Space key"
                className="control-key pixel-art"
              />
            </div>
            <p>Use Ability</p>
          </div>

          <div className="htp-section">
            <p className="htp-section-title gradient-text">Objective</p>
            <div className="text-align-center">
              <p>Survive until the time runs out.</p>
              <p>Avoid snakes and obstacles.</p>
              <p>Win by having more points.</p>
              <br />
              <div className="htp-objective-apples-row">
                <div className="htp-objective-apples-column">
                  <img
                    className="htp-apple-image pixel-art"
                    src={goldenApple}
                    alt="Golden Apple"
                  />
                  <p>300</p>
                </div>
                <div className="htp-objective-apples-column">
                  <img
                    className="htp-apple-image pixel-art"
                    src={redApple}
                    alt="Red Apple"
                  />
                  <p>100</p>
                </div>
                <div className="htp-objective-apples-column">
                  <img
                    className="htp-apple-image pixel-art"
                    src={goldenAppleRot}
                    alt="Golden Apple Rotten"
                  />
                  <p>50</p>
                </div>
                <div className="htp-objective-apples-column">
                  <img
                    className="htp-apple-image pixel-art"
                    src={redAppleRot}
                    alt="Red Apple Rotten"
                  />
                  <p>50</p>
                </div>
              </div>
              <br />
              <p>Apples rot after a while.</p>
            </div>
          </div>

          <div className="htp-section">
            <p className="htp-section-title gradient-text">Lobbies</p>
            <p className="text-color-soft">Private Lobby</p>
            <p>Customize settings.</p>
            <p>Play alone or invite a friend.</p>
            <br />
            <p className="text-color-soft">Public Lobby</p>
            <p>
              Opponent: <span className="text-color-alternate">Random</span>
            </p>
            <p>
              Map: <span className="text-color-alternate">Random</span>
            </p>
            <p>
              Map Size: <span className="text-color-alternate">Random</span>
            </p>
            <p>
              Speed: <span className="text-color-alternate">Random</span>
            </p>
            <p>Time Limit: 120s</p>
            <p>
              Borders: <span className="text-color-red">OFF</span>
            </p>
            <p>
              Abilities: <span className="text-color-green">ON</span>
            </p>
          </div>

          {/* <div className="htp-section">
            <p className="htp-section-title gradient-text">Maps</p>
            <p>Different maps have unique layouts and obstacles.</p>
          </div> */}
        </div>

        <br />

        {/* Close Button */}
        <button
          className="button-default button-height-less button-width-less"
          onClick={() => setGuide(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HowToPlayOverlay;
