import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: { email: string } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action:  PayloadAction<{ user: { email: string } }>) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
