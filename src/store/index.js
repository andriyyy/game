import { createStore, applyMiddleware } from "redux";
//import logger from "redux-logger";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import Api from "../services/Api";
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({
        api: new Api(),
      })
    )
  )
);

export default store;
