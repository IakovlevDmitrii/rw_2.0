import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducers";
import {loadFromLocalStorage, saveToLocalStorage} from "../utils";
import {createLogger} from "redux-logger";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const loggerMiddleware = createLogger()

const store = createStore(
  reducer,
  loadFromLocalStorage(),
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)),
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
