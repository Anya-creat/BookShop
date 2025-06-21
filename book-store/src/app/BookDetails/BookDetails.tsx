'use client'
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'
import { IBookDetails } from '@/app/features/books/types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCart, toggleFavorite } from '../features/books/bookSlice';
import { BackArrow, FavoriteIcon } from '@/app/svg/svg';
import Link from 'next/link';
import { fetchRelatedBooks } from '../features/books/bookThunks';
import Subscribe from '@/app/components/subscribe/Subscribe';
import { useRouter } from 'next/navigation';

interface IDetailsCard {
  book: IBookDetails;
}

const SelectedPost: React.FC<IDetailsCard> = ({ book }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { favorites, cart, relatedBooks, isLoadingRelated } = useAppSelector((state) => state.books)
  const [activeTab, setActiveTab] = useState<'description' | 'authors' | 'reviews'>('description');

  const { email } = useAppSelector((state) => state.profile);
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const isFavorite = favorites.includes(book.isbn13);
  const isInCart = cart.some((item) => item.isbn13 === book.isbn13);

  useEffect(() => {
    dispatch(fetchRelatedBooks())
  }, [])

  const handleAddToFavorites = () => {
    if(!email) {
      router.push('/signin')
      return
    }
    dispatch(toggleFavorite({
      isbn13: book.isbn13,
      userId: email || undefined
    }))
  }

  const handleAddToCart = () => {
    if(!email) {
      router.push('/signin')
      return
    }
    if (!isInCart) {
      setIsAddingToCart(true);
      dispatch(addToCart({
        item: {
          isbn13: book.isbn13,
          title: book.title,
          price: book.price,
          image: book.image,
          quantity: 1
        },
        userId: email || undefined
      }));
    }
  }


  return (
    <div className={styles.book}>
      <div className={styles.book_wrapper_arrow}>
        <Link href='/' className={styles.book_arrow}><BackArrow /></Link>
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
            className={`${styles.card_add_btn} ${isAddingToCart ? styles.card_added_btn : ''} ${isInCart ? styles.card_incart_btn : ''}`}
            onClick={handleAddToCart}
            disabled={isAddingToCart || isInCart}
          >
            {isInCart ? 'IN CART' : isAddingToCart ? 'ADDED TO CART' : 'ADD TO CART'}
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
      <div>

        <Subscribe />

        <h2 className={styles.more_book_title}>
          Similar Book
        </h2>

        {isLoadingRelated ? (
          <div>
            <div></div>
            <span>Loading books...</span>
          </div>
        ) : (
          <div className={styles.more_book_wrapper}>
            {relatedBooks.map((relatedBook) => (
              <Link
                key={relatedBook.isbn13}
                href={`/book/${relatedBook.isbn13}`}
              >
                <div className={styles.more_card}>
                  <div className={styles.more_booke_img}>
                    <img
                      src={relatedBook.image}
                      alt={relatedBook.title}
                    />
                  </div>
                  <div className={styles.more_book_info}>
                    <h3 className={styles.more_book_title}>
                      {relatedBook.title}
                    </h3>
                    <p className={styles.more_book_subtitle}>{relatedBook.subtitle}</p>
                    <div className={styles.more_book_price}>
                      <span>{relatedBook.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>


  );
};

export default SelectedPost;