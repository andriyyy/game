import * as R from "ramda";
const INITIAL_STATE = {
  winners: null,
  winnersGetErrored: false,
  winnersIsLoading: false,
};

const applySetWinners = (state, action) =>
  R.merge(state, { winners: action.winners });

const applySetWinnersHasErrored = (state, action) =>
  R.merge(state, { winnersGetErrored: action.hasErrored });

const applyWinnersIsLoading = (state, action) =>
  R.merge(state, { winnersIsLoading: action.isLoading });

function winnersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "WINNERS_SET": {
      return applySetWinners(state, action);
    }
    case "WINNERS_HAS_ERRORED": {
      return applySetWinnersHasErrored(state, action);
    }
    case "WINNERS_IS_LOADING": {
      return applyWinnersIsLoading(state, action);
    }

    default:
      return state;
  }
}

export default winnersReducer;
