/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { LastTickets, ITrain } from '../interfaces/Interfaces';

// Server
import { serverURL } from '../App';

const initialState: LastTickets = {
  status: 'idle',
  error: '',
  items: [],
};

export type Params = { count?: string; category?: number; searchString?: string };

export const lastTicketsFetchData = createAsyncThunk('lastTickets/FetchingData', async () => {
  const reqURL = `${serverURL}/routes/last`;
  const response = await fetch(reqURL);
  if (!response.ok) {
    throw new Error(`request error: ${reqURL}`);
  }
  return response.json();
});

export const lastTicketsSlice = createSlice({
  name: 'lastTickets',
  initialState,
  reducers: {
    lastTicketsSet: (state, action) => {
      state.items = action.payload;
    },
    lastTicketsReset: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(lastTicketsFetchData.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(lastTicketsFetchData.fulfilled, (state, action: PayloadAction<ITrain[]>) => {
      state.items = [...action.payload];
      state.status = 'success';
    });
    builder.addCase(lastTicketsFetchData.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export const { lastTicketsSet, lastTicketsReset } = lastTicketsSlice.actions;

export const lastTickets = lastTicketsSlice.reducer;
