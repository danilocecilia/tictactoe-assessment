import { combineReducers } from "redux";
import boardGame from "./board";
import score from "./score";

const boardGameApp = combineReducers({
  board: boardGame,
  scoreGame: score
});

export default boardGameApp;
