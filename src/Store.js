import { combineReducers, createStore } from 'redux';
import { DashboardReducer } from './Redux/reducers';

const reducer = combineReducers({
  omnitracker: DashboardReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;
