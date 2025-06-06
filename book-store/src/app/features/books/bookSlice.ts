

import { IBook, IBookDetails, IBooksState } from "@/app/features/books/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IBooksState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<IBook[]>) => {
      state.books = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedBook: (state, action: PayloadAction<IBookDetails | null>) => {
      state.selectedBook = action.payload;
    }
  }
});

export const { setBooks, setLoading, setError, setSelectedBook } = booksSlice.actions;
export default booksSlice.reducer;