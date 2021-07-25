import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
  name: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  name: localStorage.getItem('user.name') ?? '',
  isLoggedIn: !!localStorage.getItem('user.name'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggin: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.isLoggedIn = true;

      localStorage.setItem('user.name', state.name);
    },
    logout: (state) => {
      state.name = '';
      state.isLoggedIn = false;
      localStorage.removeItem('user.name');
    },
  },
});

export const selectLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUser = (state: RootState) => state.user.name;

export const { loggin, logout } = userSlice.actions;

export default userSlice.reducer;
