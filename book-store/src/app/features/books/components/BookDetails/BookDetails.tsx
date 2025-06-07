'use client'
import React, { useState } from 'react';
import styles from './styles.module.css'
import { IBookDetails } from '@/app/features/books/types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { addToCart, toggleFavorite } from '../../bookSlice';
import { BackArrow, FavoriteIcon } from '@/app/svg/svg';

interface IDetailsCard {
  book: IBookDetails;
}

const SelectedPost: React.FC<IDetailsCard> = ({ book }) => {
  const dispatch = useAppDispatch()
  const { favorites, cart } = useAppSelector((state: RootState) => state.books)
  const [activeTab, setActiveTab] = useState<'description' | 'authors' | 'reviews'>('description');
  const [addToCartPage, setAddToCartPage] = useState(false)

  const isFavorite = favorites.includes(book.isbn13);
  const isInCart = cart.some((item: { isbn13: string; }) => item.isbn13 === book.isbn13);

  const handleAddToFavorites = () => {
    dispatch(toggleFavorite(book.isbn13))
  }

  const handleAddToCart = () => {
    if (!isInCart) {
      setAddToCartPage(true);
      dispatch(addToCart({
        isbn13: book.isbn13,
        title: book.title,
        price: book.price,
        image: book.image,
        quantity: 1
      }));
      setTimeout(() => setAddToCartPage(false), 2000);
    }
  }


  return (
    <div className={styles.book}>
      <div className={styles.book_wrapper_arrow}>
        <a href='/' className={styles.book_arrow}><BackArrow /></a>
      </div>
      <h2 className={styles.book_title}>{book.title}</h2>

      <div className={styles.card}>
        <div className={styles.card_img_section}>
          <div className={styles.card_img_wrapper}>
            <img src={book.image} alt={book.title} className={styles.card_img} />
          </div>
          <button
            className={`${styles.card_button} ${isFavorite ? styles.favoriteActive : ''}`}
            onClick={handleAddToFavorites}>
            <FavoriteIcon />
          </button>
        </div>

        <div className={styles.card_info}>
          <div className={styles.card_price_wrapper}>
            <span className={styles.card_price}>{book.price}</span>
          </div>

          <div className={styles.card_details}>
              <div className={styles.card_details_Row}>
                <span className={styles.card_details_Label}>Authors</span>
                <span className={styles.card_details_Value}>{book.authors}</span>
              </div>
              <div className={styles.card_details_Row}>
                <span className={styles.card_details_Label}>Publisher</span>
                <span className={styles.card_details_Value}>{book.publisher}</span>
              </div>
              <div className={styles.card_details_Row}>
                <span className={styles.card_details_Label}>Language</span>
                <span className={styles.card_details_Value}>English</span>
              </div>
              <div className={styles.card_details_Row}>
                <span className={styles.card_details_Label}>Format</span>
                <span className={styles.card_details_Value}>Paper book / ebook (PDF)</span>
              </div>
          </div>

          <div className={styles.card_moredetails_wrapper}>
              <button className={styles.card_moredetails}>More details ▼</button>
          </div>

            <button
              className={`${styles.card_add_btn} ${addToCartPage ? styles.card_added_btn : ''} ${isInCart ? styles.card_incart_btn : ''}`}
              onClick={handleAddToCart}
              disabled={addToCartPage || isInCart}
            >
              {isInCart ? 'IN CART' : addToCartPage ? 'ADDED TO CART' : 'ADD TO CART'}
            </button>

            <button className={styles.card_preview_btn}>
              Preview book
            </button>
        </div>
      </div>

      <div className={styles.tab}>
          <div className={styles.tab_wrapper}>
            <button
              className={`${styles.tab_btn} ${activeTab === 'description' ? styles.tab_active : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`${styles.tab_btn} ${activeTab === 'authors' ? styles.tab_active : ''}`}
              onClick={() => setActiveTab('authors')}
            >
              Authors
            </button>
            <button
              className={`${styles.tab_btn} ${activeTab === 'reviews' ? styles.tab_active : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className={styles.tab_content}>
            {activeTab === 'description' && (
              <div>
                <p>{book.desc}</p>
              </div>
            )}
            {activeTab === 'authors' && (
              <div>
                <p><strong>Authors:</strong> {book.authors}</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <p><strong>Rating:</strong> {book.rating}/5</p>
              </div>
            )}
          </div>


      </div>
    </div>

  );
};

export default SelectedPost;