import {configureStore,combineReducers } from "@reduxjs/toolkit"
import authSlice from "@/store/authSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
  };
  const rootReducer = combineReducers({
    auth: authSlice,
  });
const persistedReducer =persistReducer(persistConfig,rootReducer)
const store=configureStore({
    reducer:{
        auth:persistedReducer

    }
})
const persistor = persistStore(store);
export { store, persistor };