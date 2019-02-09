import { combineReducers } from "redux";
import moves from "./board";

const boardGameApp = combineReducers({
  moves
});

export default boardGameApp;
