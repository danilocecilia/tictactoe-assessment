import { combineReducers } from "redux";
import boardGame from "./board";

const boardGameApp = combineReducers({
  game: boardGame
});

export default boardGameApp;
