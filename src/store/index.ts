import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import notificationReducer from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
