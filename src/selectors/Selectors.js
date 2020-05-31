// Selectors
import * as R from "ramda";
function getSettings(state) {
  if (state.settingsState.settings !== null) {
    return state.settingsState.settings;
  } else {
    return false;
  }
}

function getSettingsIsLoading(state) {
  return state.settingsState.settingsIsLoading;
}

function getSettingsError(state) {
  return state.settingsState.settingsError;
}

function getWinners(state) {
  if (state.winnersState.winners !== null) {
    return state.winnersState.winners;
  } else {
    return false;
  }
}

function getWinnersIsLoading(state) {
  return state.winnersState.winnersIsLoading;
}

function getWinnersError(state) {
  return state.winnersState.winnersError;
}

function getItem(id, items) {
  let elem = null;
  if (items) {
    items.forEach(function (element) {
      if (id === element.id) {
        elem = element;
      }
    });
    return elem;
  } else {
    return false;
  }
}
function getId(ownProps) {
  return ownProps.match.params.id;
}

function getModes(state) {
  return R.keys(state.settingsState.settings);
}

export {
  getSettings,
  getSettingsIsLoading,
  getSettingsError,
  getWinners,
  getWinnersIsLoading,
  getWinnersError,
  getItem,
  getId,
  getModes,
};
