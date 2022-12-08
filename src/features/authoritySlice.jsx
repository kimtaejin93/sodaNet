import { createSlice } from '@reduxjs/toolkit';

export const authoritySlice = createSlice({
  name: 'authority',
  initialState: {
    authority: false,
    loginId: '',
    user: '',
  },
  reducers: {
    loginInfo: (state, actions) => {
      state.authority = true;
      state.loginId = actions.payload;
    },
    logout: (state) => {
      state.authority = false;
      state.loginId = '';
    },
    userInfo: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { loginInfo, logout, userInfo } = authoritySlice.actions;

export default authoritySlice.reducer;
