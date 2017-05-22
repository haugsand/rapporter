import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import {enableBatching} from 'redux-batched-actions';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === `development`) {
  const createLogger = require(`redux-logger`);
  const logger = createLogger({
  	collapsed: true
  });
  middlewares.push(logger);
}

const enhancer = compose(
	applyMiddleware(...middlewares)
);


//const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

const store = createStore(enableBatching(rootReducer), undefined, enhancer);

export default store;