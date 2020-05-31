export function settingsFetchDataSuccess(settings) {
  return {
    type: "SETTINGS_SET",
    settings,
  };
}

export function settingsError(error) {
  return {
    type: "SETTINGS_ERROR",
    error,
  };
}

export function settingsIsLoading(bool) {
  return {
    type: "SETTINGS_IS_LOADING",
    isLoading: bool,
  };
}

export function winnersFetchDataSuccess(winners) {
  return {
    type: "WINNERS_SET",
    winners,
  };
}

export function winnersError(error) {
  return {
    type: "WINNERS_ERROR",
    error,
  };
}

export function winnersIsLoading(bool) {
  return {
    type: "WINNERS_IS_LOADING",
    isLoading: bool,
  };
}

export function winnersIsSending(bool) {
  return {
    type: "WINNERS_IS_SENDING",
    isSending: bool,
  };
}

export function winnersIsSendingSuccess(winners) {
  return {
    type: "WINNERS_SET",
    winners,
  };
}
export function winnersIsSendingError(error) {
  return {
    type: "WINNERS_SENDING_ERROR",
    error,
  };
}

export function serverFetchData() {
  return (dispatch, getState, { api }) => {
    dispatch(settingsIsLoading(true));
    dispatch(winnersIsLoading(true));
    api
      .settings()
      .then((res) => res.json())
      .then((result) => {
        dispatch(settingsFetchDataSuccess(result));
        dispatch(settingsIsLoading(false));
      })
      .catch((error) => {
        settingsError(error);
      });

    api
      .winners()
      .then((res) => res.json())
      .then((result) => {
        dispatch(winnersFetchDataSuccess(result));
        dispatch(winnersIsLoading(false));
      })
      .catch((error) => {
        winnersError(error);
      });
  };
}

export function addWinner(user) {
  return (dispatch, getState, { api }) => {
    dispatch(winnersIsSending(true));
    api
      .winnersSend(user)
      .then((res) => res.json())
      .then((result) => {
        dispatch(winnersFetchDataSuccess(result));
        dispatch(winnersIsSending(false));
      })
      .catch((error) => {
        winnersIsSendingError(error);
      });
  };
}
