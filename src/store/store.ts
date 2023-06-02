import { configureStore } from '@reduxjs/toolkit';

import mapReducer from './slices/mapSlice';
import userReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    userData: userReducer,
    mapData: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
