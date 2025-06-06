'use client'
import React from 'react';
import styles from './styles.module.css'
import { IBookDetails } from '@/app/features/books/types';

interface IDetailsCard {
  book: IBookDetails;
  onBack: () => void;
}

const SelectedPost: React.FC<IDetailsCard> = ({ book, onBack }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.backButton} onClick={onBack}>Back</button>
      <div className={styles.content}>
        <img src={book.image} alt={book.title} className={styles.image} />
        <div className={styles.info}>
          <h2 className={styles.title}>{book.title}</h2>
          <p className={styles.subtitle}>{book.subtitle}</p>
          <p className={styles.authors}>By {book.authors}</p>
          <p className={styles.publisher}>Publisher: {book.publisher}</p>
          <p className={styles.year}>Year: {book.year}</p>
          <p className={styles.price}>Price: {book.price}</p>
          <p className={styles.rating}>Rating: {book.rating}</p>
          <p className={styles.description}>{book.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedPost;