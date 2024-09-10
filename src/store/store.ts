import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './features/currentUserSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      currentUser: currentUserReducer,
    },
  });
};

// NOTE: Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// NOTE: Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
