import redSnake from "./assets/images/SnakeFull-red.png";
import orangeSnake from "./assets/images/SnakeFull-orange.png";
import yellowSnake from "./assets/images/SnakeFull-yellow.png";
import greenSnake from "./assets/images/SnakeFull-green.png";
import lightBlueSnake from "./assets/images/SnakeFull-blue-light.png";
import darkBlueSnake from "./assets/images/SnakeFull-blue-dark.png";
import purpleSnake from "./assets/images/SnakeFull-purple.png";
import pinkSnake from "./assets/images/SnakeFull-pink.png";

import headTailSwap from "./assets/images/AbilityIcons-HeadTailSwap.png";
import freezeTime from "./assets/images/AbilityIcons-FreezeTime.png";
import cutTail from "./assets/images/AbilityIcons-CutTail.png";

import trophy from "./assets/images/Trophy.png";
import skull from "./assets/images/Skull.png";

import palette from "./assets/images/PaletteIcon.png";
import powerup from "./assets/images/AbilityIcon.png";

import mapPlains from "./assets/images/Maps-Plains.png";
import mapDesert from "./assets/images/Maps-Desert.png";
import mapVolcano from "./assets/images/Maps-Volcano.png";

// export const SERVER_BASE_URL = "http://127.0.0.1:5030";
export const SERVER_BASE_URL =
  "https://snake1v1-gvfug6g0bwcfgjeu.spaincentral-01.azurewebsites.net";
export const BASE_PATH = "/Snake-1v1";
export const COLORS = [
  "#cf3636",
  "#da6f2a",
  "#e2c019",
  "#7de219",
  "#3adfba",
  "#3245df",
  "#5f2b92",
  "#b541b5",
];

export const SNAKE_SPRITES = [
  redSnake,
  orangeSnake,
  yellowSnake,
  greenSnake,
  lightBlueSnake,
  darkBlueSnake,
  purpleSnake,
  pinkSnake,
];

export const ABILITIES = [
  {
    id: 0,
    name: "Head-Tail Swap",
    img: headTailSwap,
    description: <>Swaps the snake's head and tail.</>,
    cooldown: 7,
  },
  {
    id: 1,
    name: "Freeze Time",
    img: freezeTime,
    description: <>Freezes the opponent for a few turns.</>,
    cooldown: 12,
  },
  {
    id: 2,
    name: "Cut Tail",
    img: cutTail,
    description: (
      <>
        Requires 4+ size.
        <br />
        Converts tail into meat.
      </>
    ),
    cooldown: 15,
  },
];

export const MAPS = [
  { img: mapPlains, name: "Plains" },
  { img: mapDesert, name: "Desert" },
  { img: mapVolcano, name: "Volcano" },
];

export const WINS_ICON = trophy;
export const LOSSES_ICON = skull;
export const COLORS_ICON = palette;
export const ABILITIES_ICON = powerup;
