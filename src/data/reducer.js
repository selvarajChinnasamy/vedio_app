import { combineReducers } from 'redux';
import { reducer as usersReducer } from './user/reducer';

export const reducer = combineReducers({
	user: usersReducer,
});
