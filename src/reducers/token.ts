import { createSlice } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';

export const tokenSlice = createSlice<string, { setToken: CaseReducer<string, PayloadAction<string>> }, 'token'>({
  name: 'token',
  initialState: '',
  reducers: {
    setToken: (_, action) => action.payload,
  },
});

export const { setToken } = tokenSlice.actions;

export const token = tokenSlice.reducer;
