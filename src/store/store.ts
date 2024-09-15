import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './features/currentUserSlice';
import restRequestsReducer from './features/requestListSlice';
import clickedRestReducer from './features/clickedRestSlice';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';

export const makeStore = () => {
  const persistConfig = { key: 'root', storage };

  const reducers = combineReducers({
    restRequests: restRequestsReducer,
    currentUser: currentUserReducer,
    clickedRestId: clickedRestReducer,
  });

  const persistedReducer = persistReducer(persistConfig, reducers);

  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// NOTE: Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// NOTE: Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
