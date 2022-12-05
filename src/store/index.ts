import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import columnDataSilce from './columnDataSlice';
import pointsSlice from './pointsSlice';
import sliceBoards from './sliceBoards';
import usersSlice from './usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: sliceBoards,
    columnData: columnDataSilce,
    users: usersSlice,
    points: pointsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
