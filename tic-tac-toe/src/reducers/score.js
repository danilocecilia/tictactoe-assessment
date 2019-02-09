const score = (state = {}, action) => {
  switch (action.type) {
    case "ADD_SCORE":
      return [action.score];
    default:
      return state;
  }
};

export default score;
