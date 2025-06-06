

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBookDetails } from '@/app/features/books/types';
import { setBooks, setLoading, setError, setSelectedBook } from './bookSlice';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (query: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`https://api.itbook.store/1.0/new`);
      const data = await response.json();
      dispatch(setBooks(data.books));
    } catch (error) {
      dispatch(setError('Ошибка при загрузке книг'));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchBookDetails = createAsyncThunk(
  'books/fetchBookDetails',
  async (isbn13: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных книги');
      }
      const data: IBookDetails = await response.json();
      dispatch(setSelectedBook(data));
    } catch (error) {
      dispatch(setError('Ошибка при загрузке информации о книге'));
    } finally {
      dispatch(setLoading(false));
    }
  }
);