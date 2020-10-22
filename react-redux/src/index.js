import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//import { BrowserRouter as Router } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import counterReducer from "./store/reducers/counter";
import characterReducer from "./store/reducers/character";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  counterReducer: counterReducer,
  characterReducer: characterReducer,
});

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("[middleware] dispatching ", action);
      const result = next(action);
      console.log("[middleware] next state ", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
