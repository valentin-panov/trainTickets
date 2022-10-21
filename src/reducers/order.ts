/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder, IOrderSeat, IPersonalData, ISelectedSeat } from '../interfaces/Interfaces';
import { serverURL } from '../App';

const initialState: IOrder = {
  status: 'idle',
  error: '',
  user: {
    first_name: '',
    last_name: '',
    patronymic: '',
    phone: '',
    email: '',
    payment_method: 'cash',
  },
  departure: {
    route_direction_id: '',
    seats: [],
  },
};
export const asyncPostOrder = createAsyncThunk('postOrder', async (order: IOrder) => {
  const response = await fetch(`${serverURL}/order`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...order.departure, ...order.user }),
  });

  if (!response.ok) {
    throw new Error('request error');
  }
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderReset: () => initialState,
    orderSet: (_, action: PayloadAction<IOrder>) => action.payload,
    orderAddRoute: (state, action: PayloadAction<string>) => ({
      ...state,
      departure: {
        ...state.departure,
        route_direction_id: action.payload,
      },
    }),
    orderAddSeat: (state, action: PayloadAction<ISelectedSeat>) => ({
      ...state,
      departure: {
        ...state.departure,
        seats: [
          ...state.departure.seats,
          {
            price: action.payload.price || '',
            coach_id: action.payload.coach_id || '',
            seat_number: action.payload.seat_number || '',
            is_child: action.payload.is_child,
            include_children_seat: action.payload.include_children_seat,
          },
        ],
      },
    }),
    orderSetSeats: (state, action: PayloadAction<IOrderSeat[]>) => ({
      ...state,
      departure: {
        ...state.departure,
        seats: action.payload,
      },
    }),
    orderSetPD: (state, action: PayloadAction<IPersonalData>) => ({
      ...state,
      user: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(asyncPostOrder.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(asyncPostOrder.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(asyncPostOrder.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export const { orderReset, orderSet, orderAddRoute, orderAddSeat, orderSetSeats, orderSetPD } = orderSlice.actions;

export const order = orderSlice.reducer;
