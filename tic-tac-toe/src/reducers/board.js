import undoable from "redux-undo";

const move = (state, action) => {
  switch (action.type) {
    case "ADD_MOVE":
      return {
        index: action.index,
        player: action.player
      };
    default:
      return state;
  }
};

const moves = (state = [], action) => {
  switch (action.type) {
    case "ADD_MOVE":
      return [...state, move(undefined, action)];
    default:
      return state;
  }
};

const undoableMove = undoable(moves);

export default undoableMove;
