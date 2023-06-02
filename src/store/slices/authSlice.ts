import { createSlice } from '@reduxjs/toolkit';

import { getUser } from '../thunks/authThunk';
import { AuthState } from '../../types/User.type';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.error = 'Unable to fetch the current user.';
      state.isLoading = false;
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
