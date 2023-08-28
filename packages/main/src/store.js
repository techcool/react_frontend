import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import persistState from "redux-sessionstorage";
import thunk from "redux-thunk";

import reducer from "./reducers/index";

let devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "production") {
  devTools = a => a;
}

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  compose(
    persistState(),
    applyMiddleware(
      thunk,
      loggerMiddleware
    ),
    devTools
  )
);

export default store;
