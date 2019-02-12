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
      return { ...state, board: board };
    case "ADD_MOVE":
      return { ...state, board: move(state.board, action) };
    case "CLEAR_BOARD":
      return { board: action.board };
    case "END_GAME":
      return Object.assign({}, state, { winner: action.winner });
    default:
      return state;
  }
};

const undoableMove = undoable(boardGame);

export default undoableMove;
