import { applyMiddleware } from "redux";

const storage = (store) => (next) => (action) => {
  next(action);
  const data = store.getState();

};

const middleware = applyMiddleware(storage);

export default middleware;
