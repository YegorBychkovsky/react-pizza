import { configureStore } from '@reduxjs/toolkit';

import filter from './slices/filter/slice';
import cart from './slices/cart/slice';
import pizza from './slices/pizza/slice';
import authorization from './slices/authorization/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    authorization,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
