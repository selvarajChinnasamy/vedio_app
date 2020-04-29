import * as actionTypes from './actionTypes';

const initialState = {
	items: {},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return {
					...action.user
			};
		case actionTypes.EMPTY:
			return {};
		default:
			return state;
	}
};
