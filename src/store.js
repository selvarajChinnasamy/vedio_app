
import { createStore, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import { AsyncStorage } from 'react-native';

import { reducer as dataReducer } from './data/reducer';
import { reducer as servicesReducer } from './services/reducer';
import * as persistActionCreators from './services/persist/actions';

const appReducer = combineReducers({
    services: servicesReducer,
	data: dataReducer,
});

const store = createStore(
    appReducer,
    autoRehydrate(),
);
const saveAndLoadSessionFilter = createFilter(
    'services',
    ['session'],
    ['session']
);

export const persist = persistStore(store, {
    storage: AsyncStorage,
    blacklist: ['data'],
    transforms: [saveAndLoadSessionFilter],
}, () => store.dispatch(persistActionCreators.update({ isHydrated: true })));

export default store;