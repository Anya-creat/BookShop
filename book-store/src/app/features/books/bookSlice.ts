import {
  IBook,
  IBookDetails,
  IBooksState,
  ICartItem,
} from "@/app/features/books/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IBooksState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
  favorites: [],
  cart: [],
  searchResults: [],
  searchQuery: "",
  isSearching: false,
  relatedBooks: [],
  isLoadingRelated: false,
};

const saveFavorites = (userId: string, favorites: string[]) => {
  if (userId && typeof window !== "undefined") {
    try {
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }
};
const saveCart = (userId: string, cart: ICartItem[]) => {
  if (userId && typeof window !== "undefined") {
    try {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }
};
const loadFavorites = (userId: string): string[] => {
  if (!userId || typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(`favorites_${userId}`);
    const result = saved ? JSON.parse(saved) : [];
    return result;
  } catch (error) {
    return [];
  }
};
const loadCart = (userId: string): ICartItem[] => {
  if (!userId || typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(`cart_${userId}`);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

const booksSlice = createSlice({
  name: "books",
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
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<IBook[]>) => {
      state.searchResults = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setRelatedBooks: (state, action: PayloadAction<IBook[]>) => {
      state.relatedBooks = action.payload;
    },
    setIsLoadingRelated: (state, action: PayloadAction<boolean>) => {
      state.isLoadingRelated = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchResults = [];
      state.isSearching = false;
    },
    loadUserData: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      const loadedFavorites = loadFavorites(userId);
      const loadedCart = loadCart(userId);

      state.favorites = loadedFavorites;
      state.cart = loadedCart;
    },
    clearUserData: (state) => {
      state.favorites = [];
      state.cart = [];
    },

    toggleFavorite: (
      state,
      action: PayloadAction<{ isbn13: string; userId?: string }>
    ) => {
      const { isbn13, userId } = action.payload;
      const index = state.favorites.indexOf(isbn13);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(isbn13);
      }

      if (userId) {
        saveFavorites(userId, state.favorites);
      }
    },
    addToCart: (
      state,
      action: PayloadAction<{ item: ICartItem; userId?: string }>
    ) => {
      const { item, userId } = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.isbn13 === item.isbn13
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }

      if (userId) {
        saveCart(userId, [...state.cart]);
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ isbn13: string; userId?: string }>
    ) => {
      const { isbn13, userId } = action.payload;
      state.cart = state.cart.filter((item) => item.isbn13 !== isbn13);

      if (userId) {
        saveCart(userId, [...state.cart]);
      }
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{
        isbn13: string;
        quantity: number;
        userId?: string;
      }>
    ) => {
      const { isbn13, quantity, userId } = action.payload;
      const item = state.cart.find((cartItem) => cartItem.isbn13 === isbn13);
      if (item) {
        item.quantity = quantity;
      }

      if (userId) {
        saveCart(userId, [...state.cart]);
      }
    },
  },
});

export const {
  setBooks,
  setLoading,
  setError,
  setSelectedBook,
  setSearchQuery,
  setRelatedBooks,
  setIsLoadingRelated,
  setSearchResults,
  setIsSearching,
  loadUserData,
  clearSearch,
  clearUserData,
  toggleFavorite,
  addToCart,
  removeFromCart,
  updateCartQuantity,
} = booksSlice.actions;
export default booksSlice.reducer;
