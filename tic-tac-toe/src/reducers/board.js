import undoable from "redux-undo";

const move = (state, action) => {
  switch (action.type) {
    case "ADD_MOVE":
      const newBoard = state.slice();
      newBoard[action.index] = action.player;
      return newBoard;
    default:
      return state;
  }
};

const boardGame = (state = [], action) => {
  switch (action.type) {
    case "LOAD_BOARD":
      const board = action.board;
      return [...state, board];
    case "ADD_MOVE":
      return [...state, move(state[state.length - 1], action)];
    case "CLEAR_BOARD":
      return [action.board];
    default:
      return state;
  }
};

const undoableMove = undoable(boardGame);

export default undoableMove;
