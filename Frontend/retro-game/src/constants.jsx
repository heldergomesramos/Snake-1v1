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
import ghost from "./assets/images/AbilityIcons-Ghost.png";

import trophy from "./assets/images/Trophy.png";
import skull from "./assets/images/Skull.png";

import palette from "./assets/images/PaletteIcon.png";
import powerup from "./assets/images/AbilityIcon.png";

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
    description: "Swaps the snake's head and tail.",
  },
  {
    id: 1,
    name: "Freeze Time",
    img: freezeTime,
    description: "Freezes the opponent for a few turns.",
  },
  {
    id: 2,
    name: "Ghost",
    img: ghost,
    description: "Allows the snake to pass through obstacles.",
  },
];

export const WINS_ICON = trophy;
export const LOSSES_ICON = skull;
export const COLORS_ICON = palette;
export const ABILITIES_ICON = powerup;
