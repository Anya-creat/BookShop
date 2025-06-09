import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './features/books/bookSlice'
import profileReducer from './signin/profileSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    profile: profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
