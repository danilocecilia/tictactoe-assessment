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

export const score = score => ({
  type: "ADD_SCORE",
  score
});

export const endGame = winner => ({
  type: "END_GAME",
  winner
});
