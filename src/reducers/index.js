import { combineReducers } from "redux";
import settingsReducer from "./settings";
import winnersReducer from "./winners";

const rootReducer = combineReducers({
  settingsState: settingsReducer,
  winnersState: winnersReducer,
});

export default rootReducer;
