import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISelectedSeat } from '../interfaces/Interfaces';

const initialState: ISelectedSeat[] = [];

export const selectedSeatsSlice = createSlice({
  name: 'selectedSeats',
  initialState,
  reducers: {
    selectedSeatsReset: () => initialState,
    selectedSeatsSet: (_, action: PayloadAction<ISelectedSeat[]>) => action.payload,
    selectedSeatsAdd: (state, action: PayloadAction<ISelectedSeat>) => [...state, action.payload],
  },
});

export const { selectedSeatsReset, selectedSeatsSet, selectedSeatsAdd } = selectedSeatsSlice.actions;

export const selectedSeats = selectedSeatsSlice.reducer;
