/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { ICity, IGetRoute, IGetRouteData } from '../interfaces/Interfaces';

// Server
import { serverURL } from '../App';
import { substractYY } from '../utils/substractYY';

const initialState: IGetRoute = {
  status: 'idle',
  error: '',
  data: {
    totalCount: 0,
    items: [],
  },
};

export type optionsGetTrains = {
  cityDeparture: ICity;
  cityArrival: ICity;
  dateOutbound: string | null;
  dateReturn: string | null;
  limit?: number | null;
  sort?: string | null;
  offset: number;
  filters: {
    date_start_arrival?: string;
    date_end_arrival?: string;
    have_first_class?: boolean;
    have_second_class?: boolean;
    have_third_class?: boolean;
    have_fourth_class?: boolean;
    have_wifi?: boolean;
    have_air_conditioning?: boolean;
    is_express?: boolean;
    price_from?: number;
    price_to?: number;
    start_departure_hour_from?: number;
    start_departure_hour_to?: number;
    start_arrival_hour_from?: number;
    start_arrival_hour_to?: number;
    end_departure_hour_from?: number;
    end_departure_hour_to?: number;
    end_arrival_hour_from?: number;
    end_arrival_hour_to?: number;
  };
};

export const getRouteFetchData = createAsyncThunk('getRoute/FetchingData', async (options: optionsGetTrains) => {
  const {
    cityDeparture: { _id: departureId },
    cityArrival: { _id: arrivalId },
    dateOutbound,
    dateReturn,
    limit = 5,
    sort = 'price_min',
    offset,
    filters: {
      have_first_class = false,
      have_second_class = false,
      have_third_class = false,
      have_fourth_class = false,
      have_wifi = false,
      is_express = false,
      price_from,
      price_to,
      start_departure_hour_from = 0,
      start_departure_hour_to = 0,
      start_arrival_hour_from = 0,
      start_arrival_hour_to = 0,
      end_departure_hour_from = 0,
      end_departure_hour_to = 0,
      end_arrival_hour_from = 0,
      end_arrival_hour_to = 0,
    },
  } = options;

  if (!departureId || !arrivalId) {
    throw new Error(`empty points`);
  }

  // уверен, что можно улучшить, но пока не знаю, как
  let reqURL = `${serverURL}/routes?from_city_id=${departureId}&to_city_id=${arrivalId}&limit=${limit}&sort=${sort}`;
  if (dateOutbound) {
    // temporary reduce YY by one
    reqURL += `&date_start=${substractYY(dateOutbound)}`;
    if (start_departure_hour_from) {
      reqURL += `&start_departure_hour_from=${start_departure_hour_from}`;
    }
    if (start_departure_hour_to) {
      reqURL += `&start_departure_hour_to=${start_departure_hour_to}`;
    }
    if (start_arrival_hour_from) {
      reqURL += `&start_arrival_hour_from=${start_arrival_hour_from}`;
    }
    if (start_arrival_hour_to) {
      reqURL += `&start_arrival_hour_to=${start_arrival_hour_to}`;
    }
    if (dateReturn) {
      // temporary reduce YY by one
      reqURL += `&date_end=${substractYY(dateReturn)}`;
      if (end_departure_hour_from) {
        reqURL += `&end_departure_hour_from=${end_departure_hour_from}`;
      }
      if (end_departure_hour_to) {
        reqURL += `&end_departure_hour_to=${end_departure_hour_to}`;
      }
      if (end_arrival_hour_from) {
        reqURL += `&end_arrival_hour_from=${end_arrival_hour_from}`;
      }
      if (end_arrival_hour_to) {
        reqURL += `&end_arrival_hour_to=${end_arrival_hour_to}`;
      }
    }
  }
  if (offset) {
    reqURL += `&offset=${offset}`;
  }

  // FILTERS

  reqURL += `&have_first_class=${have_first_class}`;
  reqURL += `&have_second_class=${have_second_class}`;
  reqURL += `&have_third_class=${have_third_class}`;
  reqURL += `&have_fourth_class=${have_fourth_class}`;
  reqURL += `&have_wifi=${have_wifi}`;
  reqURL += `&is_express=${is_express}`;

  if (price_from) {
    reqURL += `&price_from=${price_from}`;
  }
  if (price_to) {
    reqURL += `&price_to=${price_to}`;
    // price_to игнорируется сервером
  }

  // eslint-disable-next-line no-console
  console.log(reqURL);
  const response = await fetch(reqURL);
  if (!response.ok) {
    throw new Error(`request error: ${reqURL}`);
  }
  return response.json();
});

export const getRouteSlice = createSlice({
  name: 'getRoute',
  initialState,
  reducers: {
    getRouteSet: (state, action) => {
      state.data.items = action.payload;
    },
    getRouteReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getRouteFetchData.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(getRouteFetchData.fulfilled, (state, action: PayloadAction<IGetRouteData>) => {
      state.data.totalCount = action.payload.total_count;
      // temporary stub for design purpose
      state.data.items = [...action.payload.items].map((el) => [el, el]);
      state.status = 'success';
    });
    builder.addCase(getRouteFetchData.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export const { getRouteSet, getRouteReset } = getRouteSlice.actions;

export const getRoute = getRouteSlice.reducer;
