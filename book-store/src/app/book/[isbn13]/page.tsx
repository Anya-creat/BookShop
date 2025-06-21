'use client'

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { RootState } from '@/app/store';

import styles from './styles.module.css';

import { fetchBookDetails } from '@/app/features/books/bookThunks';
import SelectedPost from '@/app/BookDetails/BookDetails';

const BookDetailPage: React.FC = () => {
  const params = useParams();
  const isbn13 = params.isbn13 as string;

  const dispatch = useAppDispatch();
  const { selectedBook, loading, error } = useAppSelector((state: RootState) => state.books);

  useEffect(() => {
    if (isbn13) {
      dispatch(fetchBookDetails(isbn13));
    }
  }, [isbn13]);

  if (loading) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.loading_spinner}></div>
        <p className={styles.loading_text}>Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error_container}>
        <div className={styles.error_content}>
          <h2 className={styles.error_title}>Oops! Something went wrong</h2>
          <p className={styles.error_message}>{error}</p>
          <a href="/" className={styles.error_link}>
            ← Back to home
          </a>
        </div>
      </div>
    );
  }

  if (!selectedBook) {
    return (
      <div className={styles.not_found_container}>
        <div className={styles.not_found_content}>
          <h2 className={styles.not_found_title}>Book not found</h2>
          <p className={styles.not_found_message}>
            The book you're looking for doesn't exist or has been removed.
          </p>
          <a href="/" className={styles.not_found_link}>
            ← Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.book_page}>
      <SelectedPost book={selectedBook} />
    </div>
  );
};

export default BookDetailPage;