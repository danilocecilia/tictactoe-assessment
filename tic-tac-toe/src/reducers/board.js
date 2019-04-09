import undoable from "redux-undo";
import { Winning } from "../components/gameboard/minimax";

const move = (state, action) => {
  switch (action.type) {
    case "ADD_MOVE":
      const index = action.index;
      const player = action.player;
      const newBoard = state.slice();

      // Check if move is taken
      if (!isNaN(state[index])) newBoard[index] = player;

      return newBoard;
    default:
      return state;
  }
};

const isGameOver = (state, action) => {
  return Winning(state, action);
};

const boardGame = (state = [], action) => {
  switch (action.type) {
    case "LOAD_BOARD":
      const board = action.board;
      return { ...state, board: board };
    case "ADD_MOVE":
      const newBoard = move(state.board, action);
      const _isGameOver = isGameOver(newBoard, action.player);

      return {
        ...state,
        board: newBoard,
        active: action.player === "X" ? "O" : "X",
        isGameOver: _isGameOver,
        winner: _isGameOver ? action.player : ""
      };
    case "CLEAR_BOARD":
      return { board: action.board };
    default:
      return state;
  }
};

const undoableMove = undoable(boardGame);

export default undoableMove;
