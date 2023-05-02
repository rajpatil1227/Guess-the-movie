export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_MOVIES: "SET_ALL_MOVIES",
  SET_MOVIE: "SET_MOVIE",
  SET_ALL_MOVIES_DETAILS: "SET_ALL_MOVIES_DETAILS",
  SET_HINT_USED: "SET_HINT_USED",
  SET_GUESSED_TIMES: "SET_GUESSED_TIMES",
  SET_ALERT_TYPE: "SET_ALERT_TYPE",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.user };

    case actionType.SET_ALL_USERS:
      return { ...state, allUsers: action.allUsers };

    case actionType.SET_ALL_MOVIES:
      return { ...state, allMovies: action.allMovies };

    case actionType.SET_MOVIE:
      return { ...state, movie: action.movie };

    case actionType.SET_ALL_MOVIES_DETAILS:
      return { ...state, allMoviesDetails: action.allMoviesDetails };

    case actionType.SET_HINT_USED:
      return { ...state, hintsUsed: action.hintsUsed };

    case actionType.SET_GUESSED_TIMES:
      return { ...state, guessedtimes: action.guessedtimes };

    case actionType.SET_ALERT_TYPE:
      return { ...state, alertType: action.alertType };

    default:
      return state;
  }
};

export default reducer;
