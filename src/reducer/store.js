import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import {Reducer} from './reducer'; 
const persistConfig = {
  key: 'root',
  storage,
  // Specify the reducers you want to persist
  whitelist: ['ids'], // In this example, we persist the 'user' reducer
};
const persistedReducer = persistReducer(persistConfig, Reducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);