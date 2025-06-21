'use client'

import React from 'react';
import styles from './styles.module.css'
import { IBook } from '@/app/features/books/types';
import Link from 'next/link';

interface IBookCard {
  book: IBook;
  onClick?: () => void;
}

export const PostCard: React.FC<IBookCard> = ({ book, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Link href={`/book/${book.isbn13}`}>
      <div className={styles.card} onClick={handleClick}>
        <div className={styles.image_container}>
          <img src={book.image} alt={book.title} className={styles.image} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.subtitle}>{book.subtitle}</p>
          <div className={styles.price_container}>
            <span className={styles.price}>{book.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};