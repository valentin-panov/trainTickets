/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { ICoach, ITrainSeatsData } from '../interfaces/Interfaces';

// Server
import { serverURL } from '../App';

const initialState: ITrainSeatsData = {
  status: 'idle',
  error: '',
  items: [],
};

export type Params = { trainId: number };

export const trainSeatsFetchData = createAsyncThunk('trainSeats/FetchingData', async (trainId: number) => {
  const reqURL = `${serverURL}/routes/${trainId}/seats`;
  const response = await fetch(reqURL);
  if (!response.ok) {
    throw new Error(`request error: ${reqURL}`);
  }
  return response.json();
});

export const trainSeatsSlice = createSlice({
  name: 'trainSeats',
  initialState,
  reducers: {
    trainSeatsSet: (state, action) => {
      state.items = action.payload;
    },
    trainSeatsReset: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(trainSeatsFetchData.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(trainSeatsFetchData.fulfilled, (state, action: PayloadAction<ICoach[]>) => {
      state.items = [...action.payload];
      state.status = 'success';
    });
    builder.addCase(trainSeatsFetchData.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export const { trainSeatsSet, trainSeatsReset } = trainSeatsSlice.actions;

export const trainSeats = trainSeatsSlice.reducer;
