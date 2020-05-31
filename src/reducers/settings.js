import * as R from "ramda";
const INITIAL_STATE = {
  settings: null,
  settingsGetErrored: false,
  settingsIsLoading: false,
};

const applySetSettings = (state, action) =>
  R.merge(state, { settings: action.settings });

const applySetSettingsHasErrored = (state, action) =>
  R.merge(state, { settingsGetErrored: action.hasErrored });

const applySettingsIsLoading = (state, action) =>
  R.merge(state, { settingsIsLoading: action.isLoading });

function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SETTINGS_SET": {
      return applySetSettings(state, action);
    }
    case "SETTINGS_HAS_ERRORED": {
      return applySetSettingsHasErrored(state, action);
    }
    case "STTINGS_IS_LOADING": {
      return applySettingsIsLoading(state, action);
    }

    default:
      return state;
  }
}

export default settingsReducer;
