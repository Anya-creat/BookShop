

'use client';

import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import SelectedPost from '../BookDetails/BookDetails';
import { AppDispatch, RootState } from '@/app/store';
import { fetchBookDetails, fetchBooks } from '@/app/features/books/bookThunks';
import { setSelectedBook } from '@/app/features/books/bookSlice'; 
import { PostCard } from '../BookCard/BookCard';
import { Pagination } from '@/app/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

export const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books, loading, error, selectedBook } = useAppSelector((state: RootState) => state.books);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  useEffect(() => {
    dispatch(fetchBooks('mongodb'));
  }, [dispatch]);

  const handleCardClick = async (isbn13: string) => {
    await dispatch(fetchBookDetails(isbn13));
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (selectedBook) {
    return (
      <SelectedPost
        book={selectedBook}
        // onBack={() => dispatch(setSelectedBook(null))}
      />
    );
  }

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>New Releases Books</h1>
      <div className={styles.container}>
        {currentBooks.map((book) => (
          <PostCard
            key={book.isbn13}
            book={book}
            onClick={() => handleCardClick(book.isbn13)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

