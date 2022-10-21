// Reducers
import { menu } from './menu';
import { lastTickets } from './lastTickets';
import { token } from './token';
import { getRoute } from './getRoute';
import { searchParams } from './searchParams';
import { subscribe } from './subrcribe';
import { appState } from './appState';
import { getTickets } from './getTickets';
import { trainSeats } from './getSeats';
import { order } from './order';
import { selectedSeats } from './selectedSeats';

export const rootReducer = {
  menu,
  lastTickets,
  getRoute,
  searchParams,
  subscribe,
  appState,
  getTickets,
  trainSeats,
  selectedSeats,
  order,
  token,
};
