import { createSlice } from '@reduxjs/toolkit';
import { IMenu } from 'interfaces/Interfaces';

const initialState: IMenu[] = [
  {
    id: 0,
    title: 'О нас',
    pathName: '#about',
  },

  {
    id: 1,
    title: 'Как это работает',
    pathName: '#how',
  },

  {
    id: 2,
    title: 'Отзывы',
    pathName: '#reviews',
  },

  {
    id: 3,
    title: 'Контакты',
    pathName: '#contacts',
  },
];

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
});

export const menu = menuSlice.reducer;
