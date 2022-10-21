/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { ISeatsQuery, ISeatsResponse, ISeatsState } from '../interfaces/Interfaces';

// Server
import { serverURL } from '../App';

const initialState: ISeatsState = {
  status: 'idle',
  error: '',
  data: {
    _id: 0,
    name: '',
    class_type: '',
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    have_air_conditioning: false,
    have_express: false,
    seats: [{ index: 0, available: false }],
  },
};

export const getTicketsFetchData = createAsyncThunk('getRoute/FetchingData', async (options: ISeatsQuery) => {
  const {
    id,
    have_first_class = false,
    have_second_class = true,
    have_third_class = true,
    have_fourth_class = false,
    have_wifi = false,
    have_air_conditioning = false,
    have_express = false,
  } = options;

  if (!id) {
    throw new Error(`empty route id`);
  }

  let reqURL = `${serverURL}/routes/${id}/seats`;

  // FILTERS
  reqURL += `&have_first_class=${have_first_class}`;
  reqURL += `&have_second_class=${have_second_class}`;
  reqURL += `&have_third_class=${have_third_class}`;
  reqURL += `&have_fourth_class=${have_fourth_class}`;
  reqURL += `&have_wifi=${have_wifi}`;
  reqURL += `&have_air_conditioning=${have_air_conditioning}`;
  reqURL += `&have_express=${have_express}`;

  // eslint-disable-next-line no-console
  console.log(reqURL);
  const response = await fetch(reqURL);
  if (!response.ok) {
    throw new Error(`request error: ${reqURL}`);
  }
  return response.json();
});

export const getTicketsSlice = createSlice({
  name: 'getTickets',
  initialState,
  reducers: {
    getTicketsReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getTicketsFetchData.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(getTicketsFetchData.fulfilled, (state, action: PayloadAction<ISeatsResponse>) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(getTicketsFetchData.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export const { getTicketsReset } = getTicketsSlice.actions;

export const getTickets = getTicketsSlice.reducer;
