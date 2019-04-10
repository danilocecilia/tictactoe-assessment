import undoable from "redux-undo";
import { winning, getWinningLine } from "../components/gameboard/minimax";

const InitialState = {
  board: Array.from(Array(9).keys())
};

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
  return winning(state, action);
};

const boardGame = (state = InitialState, action) => {
  switch (action.type) {
    case "LOAD_BOARD":
      const board = state.board;
      return { ...state, board: board };
    case "ADD_MOVE":
      const newBoard = move(state.board, action);
      const _isGameOver = isGameOver(newBoard, action.player);

      return {
        ...state,
        board: newBoard,
        active: action.player === "X" ? "O" : "X",
        isGameOver: _isGameOver,
        winner: _isGameOver ? action.player : "",
        lineWinner: getWinningLine(newBoard, action.player)
      };
    case "CLEAR_BOARD":
      return { board: InitialState.board };
    default:
      return state;
  }
};

const undoableMove = undoable(boardGame);

export default undoableMove;
