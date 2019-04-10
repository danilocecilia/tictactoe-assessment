// human
var humanPlayer = "O";
// ai
var aiPlayer = "X";

export const getWinningLine = (board, player) => {
  if (board[0] === player && board[1] === player && board[2] === player) {
    return Array.from(Array(9), (x, index) =>
      index === 0 ? player : index === 1 ? player : index === 2 ? player : 0
    );
  } else if (
    board[3] === player &&
    board[4] === player &&
    board[5] === player
  ) {
    return Array.from(Array(9), (x, index) =>
      index === 3 ? player : index === 4 ? player : index === 5 ? player : null
    );
  } else if (
    board[6] === player &&
    board[7] === player &&
    board[8] === player
  ) {
    return Array.from(Array(9), (x, index) =>
      index === 6 ? player : index === 7 ? player : index === 8 ? player : null
    );
  } else if (
    board[0] === player &&
    board[3] === player &&
    board[6] === player
  ) {
    return Array.from(Array(9), (x, index) =>
      index === 0 ? player : index === 3 ? player : index === 6 ? player : null
    );
  } else if (
    board[1] === player &&
    board[4] === player &&
    board[7] === player
  ) {
    return Array.from(Array(9), (x, index) =>
      index === 1 ? player : index === 4 ? player : index === 7 ? player : null
    );
  } else if (
    board[2] === player &&
    board[5] === player &&
    board[8] === player
  ) {
    return Array.from(Array(9), (x, index) =>
      index === 2 ? player : index === 5 ? player : index === 8 ? player : null
    );
  } else if (
    board[0] === player &&
    board[4] === player &&
    board[8] === player
  ) {
    return Array.from(Array(9), (x, index) =>
      index === 0 ? player : index === 4 ? player : index === 8 ? player : null
    );
  } else if (
    board[2] === player &&
    board[4] === player &&
    board[6] === player
  ) {
    return Array.from(Array(9), (x, index) =>
      index === 2 ? player : index === 4 ? player : index === 6 ? player : null
    );
  }
};

export const winning = (board, player) => {
  if (
    (board[0] === player && board[1] === player && board[2] === player) ||
    (board[3] === player && board[4] === player && board[5] === player) ||
    (board[6] === player && board[7] === player && board[8] === player) ||
    (board[0] === player && board[3] === player && board[6] === player) ||
    (board[1] === player && board[4] === player && board[7] === player) ||
    (board[2] === player && board[5] === player && board[8] === player) ||
    (board[0] === player && board[4] === player && board[8] === player) ||
    (board[2] === player && board[4] === player && board[6] === player)
  ) {
    return true;
  } else {
    return false;
  }
};

export const EmptyIndexes = board => {
  return board.filter(s => s !== "O" && s !== "X");
};

const Minimax = (newBoard, player) => {
  var availableSpots = EmptyIndexes(newBoard);

  if (winning(newBoard, humanPlayer)) {
    return { score: -10 };
  } else if (winning(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availableSpots.length === 0) {
    return { score: 0 };
  }

  // an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availableSpots.length; i++) {
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
    move.index = newBoard[availableSpots[i]];

    // set the empty spot to the current player
    newBoard[availableSpots[i]] = player;

    var result;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player === aiPlayer) {
      result = Minimax(newBoard, humanPlayer);
      move.score = result.score;
    } else {
      result = Minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availableSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

  // if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  var bestScore;

  if (player === aiPlayer) {
    bestScore = -10000;
    for (var j = 0; j < moves.length; j++) {
      if (moves[j].score > bestScore) {
        bestScore = moves[j].score;
        bestMove = j;
      }
    }
  } else {
    // else loop over the moves and choose the move with the lowest score
    bestScore = 10000;
    for (var k = 0; k < moves.length; k++) {
      if (moves[k].score < bestScore) {
        bestScore = moves[k].score;
        bestMove = k;
      }
    }
  }

  // return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
};

export default Minimax;
