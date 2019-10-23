import { combineReducers } from 'redux';
import statsReducer from './cubs';

const appReducer = combineReducers({
  stats: statsReducer,
});

export default appReducer;
