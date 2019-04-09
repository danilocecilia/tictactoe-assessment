export const play = (index, player) => ({
  type: "ADD_MOVE",
  index,
  player
});

export const loadBoard = board => ({
  type: "LOAD_BOARD",
  board
});

export const clearBoard = board => ({
  type: "CLEAR_BOARD",
  board
});
