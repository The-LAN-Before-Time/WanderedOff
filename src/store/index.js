import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import userLocationsReducer from './userLocations';
import activeUsersReducer from './activeUsers';
import { composeWithDevTools } from 'redux-devtools-extension';

const combinedReducers = combineReducers({
  userLocations: userLocationsReducer,
  activeUsers: activeUsersReducer,
}); //user, token, pastSessions

const middleware = [createLogger({ collapsed: true })];
const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
