import { createStore, applyMiddleware } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// defaults to localStorage for web and AsyncStorage for react-native
// import storage from 'redux-persist/lib/storage'; 
// import CookieStorage from 'redux-persist-cookie-storage';
 
import rootReducer from './reducers';
 
const logger = createLogger({
  // ...options - https://github.com/evgenyrodionov/redux-logger
  level: 'log',
  duration: true
});

// const persistConfig = {
//   key: 'root',
//   storage, // new CookieStorage(),
//   blacklist: ['navigation']
// };

// // See: https://www.npmjs.com/package/redux-persist
// const persistedReducer = persistReducer(persistConfig, rootReducer);
 
export default () => {
  let store = createStore(rootReducer, applyMiddleware(
    thunk,
    logger
  ));
  
  return store;
};