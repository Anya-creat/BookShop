

'use client';

import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { RootState } from '@/app/store';
import { fetchBooks } from '@/app/features/books/bookThunks';
import { Pagination } from '@/app/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { PostCard } from '../BookCard/BookCard';
import Subscribe from '@/app/components/subscribe/Subscribe';

export const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books, loading, error } = useAppSelector((state: RootState) => state.books);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  useEffect(() => {
    dispatch(fetchBooks('mongodb'));
  }, []);


  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
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
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <Subscribe />
    </section>
  );
};

