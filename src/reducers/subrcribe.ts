/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Server
import { serverURL } from '../App';

// Interfaces
interface Response {
  status: boolean;
}

// Initial state

const initialState = {
  status: 'idle',
  error: '',
  response: {
    status: false,
  },
};

export const postSubscription = createAsyncThunk('subscription', async (adr: string) => {
  const response = await fetch(`${serverURL}/subscribe?email=${adr}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adr),
  });

  if (!response.ok) {
    throw new Error('request error');
  }
  return response.json();
});

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    subscriptionSetIdle(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSubscription.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(postSubscription.fulfilled, (state, action: PayloadAction<Response>) => {
      state.status = 'success';
      state.response = action.payload;
    });
    builder.addCase(postSubscription.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export const { subscriptionSetIdle } = subscriptionSlice.actions;
export const subscribe = subscriptionSlice.reducer;
