import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { searchBooks } from '../features/books/bookThunks';
import Link from 'next/link';
import { clearSearch } from '../features/books/bookSlice';
import styles from "./styles.module.css"
import { SearchIcon } from '@/app/svg/svg';


const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchResults, isSearching } = useAppSelector((state) => state.books);
  const [inputValue, setInputValue] = useState('');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.trim()) {
        dispatch(searchBooks(inputValue));
        setShowResults(true);
      } else {
        dispatch(clearSearch());
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };


  const handleResultClick = () => {
    setShowResults(false);
    setInputValue('');
    dispatch(clearSearch());
  };

  return (
    <div className={styles.search_container}>
      <div className={styles.search_input_wrapper}>
        <input
          className={styles.search_input}
          type="text"
          placeholder="Search books..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (searchResults.length > 0) setShowResults(true);
          }}

        />
        <button className={styles.search_icon}><SearchIcon /></button>
      </div>

      {showResults && (
        <div className={styles.search_results}>
          {isSearching ? (
            <div className={styles.search_loading}>
              <div className={styles.search_loading_spinner}></div>
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.slice(0, 6).map((book) => (
              <Link
                key={book.isbn13}
                href={`/book/${book.isbn13}`}
                onClick={handleResultClick}
                className={styles.search_result_item}
              >
                <div className={styles.search_result_content} >
                  <div className={styles.search_image_wrapper}>
                    <img
                      src={book.image}
                      alt={book.title}
                      className={styles.search_result_image}
                    />
                  </div>
                  <div className={styles.search_result_info}>
                    <div className={styles.search_result_title}>
                      {book.title}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : inputValue.trim() ? (
            <div className={styles.search_no_results}>
              No books found for "{inputValue}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Search

