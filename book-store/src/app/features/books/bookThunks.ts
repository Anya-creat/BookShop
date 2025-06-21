import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBookDetails } from "@/app/features/books/types";
import {
  setBooks,
  setLoading,
  setError,
  setSelectedBook,
  setSearchResults,
  setIsSearching,
  setIsLoadingRelated,
  setRelatedBooks,
} from "./bookSlice";
import { NEW_BOOK, ONE_BOOK, SEARCH_BOOK, URL_API_BOOK } from "@/app/const";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (query: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(URL_API_BOOK + NEW_BOOK);
      const data = await response.json();
      dispatch(setBooks(data.books));
    } catch (error) {
      dispatch(setError("Ошибка при загрузке книг"));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchBookDetails = createAsyncThunk(
  "books/fetchBookDetails",
  async (isbn13: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(URL_API_BOOK + ONE_BOOK + "/" + isbn13);
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных книги");
      }
      const data: IBookDetails = await response.json();
      dispatch(setSelectedBook(data));
    } catch (error) {
      dispatch(setError("Ошибка при загрузке информации о книге"));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (query: string, { dispatch }) => {
    if (!query.trim()) {
      dispatch(setSearchResults([]));
      dispatch(setIsSearching(false));
      return;
    }
    try {
      dispatch(setIsSearching(true));
      const response = await fetch(URL_API_BOOK + SEARCH_BOOK + "/" + query);
      if (!response.ok) {
        throw new Error("Ошибка при поиске книг");
      }
      const data = await response.json();
      dispatch(setSearchResults(data.books || []));
    } catch (error) {
      dispatch(setError("Ошибка при поиске книге"));
      dispatch(setSearchResults([]));
    } finally {
      dispatch(setIsSearching(false));
    }
  }
);
export const fetchRelatedBooks = createAsyncThunk(
  "books/fetchRelatedBooks",
  async (_, { dispatch }) => {
    try {
      dispatch(setIsLoadingRelated(true));
      const response = await fetch(URL_API_BOOK + NEW_BOOK);
      if (!response.ok) {
        throw new Error("Ошибка при поиске книг");
      }
      const data = await response.json();
      dispatch(setRelatedBooks(data.books?.slice(1, 4) || []));
    } catch (error) {
      dispatch(setRelatedBooks([]));
    } finally {
      dispatch(setIsLoadingRelated(false));
    }
  }
);
