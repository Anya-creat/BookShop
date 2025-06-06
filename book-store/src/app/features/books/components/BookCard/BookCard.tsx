'use client'

import React from 'react';
import styles from './styles.module.css'
import { IBook } from '@/app/features/books/types';

interface IBookCard {
  book: IBook;
  onClick: () => void;
}

export const PostCard: React.FC<IBookCard > = ({ book, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
        <img src={book.image} alt={book.title} className={styles.image} />
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.subtitle}>{book.subtitle}</p>
      <p className={styles.price}>{book.price}</p>
    </div>
  );
};