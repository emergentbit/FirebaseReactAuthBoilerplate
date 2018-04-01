import { combineReducers } from 'redux';

interface DefaultState {}
// tslint:disable-next-line:no-any
function defaultReducer(state: DefaultState = {}, action: any): DefaultState {
  return {...state};
}

// TODO: add reducers here
const combined = combineReducers({
  defaultReducer
});

export default combined;