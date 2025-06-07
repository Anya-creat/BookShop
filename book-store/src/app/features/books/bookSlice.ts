

import { IBook, IBookDetails, IBooksState, ICartItem } from "@/app/features/books/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IBooksState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
  favorites: [],
  cart: [],
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
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const isbn13 = action.payload
      const index = state.favorites.indexOf(isbn13)
      if(index > -1) {
        state.favorites.splice(index, 1)
      } else {
        state.favorites.push(isbn13)
      }
    },

    addToCart:  (state, action: PayloadAction<ICartItem>) => {
        const existingItem = state.cart.find(item => item.isbn13 === action.payload.isbn13);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.isbn13 !== action.payload);
    },
    updateCartQuantity: (state, action: PayloadAction<{ isbn13: string; quantity: number }>) => {
      const item = state.cart.find(item => item.isbn13 === action.payload.isbn13);
       if (item) {
        item.quantity = action.payload.quantity;
      }
  }
}
});

export const { setBooks, setLoading, setError, setSelectedBook, toggleFavorite, addToCart, removeFromCart, updateCartQuantity } = booksSlice.actions;
export default booksSlice.reducer;