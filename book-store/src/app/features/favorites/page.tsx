'use client'

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RootState } from "@/app/store";
import { toggleFavorite } from "../books/bookSlice";
import styles from "./styles.module.css"
import { BackArrow, FavoriteIcon } from "@/app/svg/svg";


interface IFavoritePage {
    onBack: () => void
}

const FavoritePage: React.FC<IFavoritePage> = ({ onBack }) => {
    const dispatch = useAppDispatch();
    const { books, favorites } = useAppSelector((state: RootState) => state.books)

    const favoriteBooks = books.filter(book => favorites.includes(book.isbn13))

    const handleRemoveFromFavorites = (isbn13: string) => {
        dispatch(toggleFavorite(isbn13))
    }

    return (
        <div className={styles.favorites}>
            <div className={styles.favorites_header}>
                <a className={styles.favorites_back_button} href="/"><BackArrow /></a>
                <h1 className={styles.favorites_title}>Favorites</h1>
            </div>

            <div className={styles.favorites_container}>
                {favoriteBooks.length === 0 ? (
                    <div className={styles.favorites_empty}>
                        <p>У вас пока нет избранных книг</p>
                    </div>
                ) : (
                    favoriteBooks.map((book) => (
                        <div key={book.isbn13} className={styles.favorite_item}>
                            <div className={styles.favorite_img_wrapper}>
                                <img src={book.image} alt={book.title} />
                            </div>

                            <div className={styles.favorite_nfo}>
                                <h3 className={styles.favorite_bookTitle}>{book.title}</h3>
                                <p className={styles.favorite_author}>by Lantin Joseph, Apress 2018</p>
                                <div className={styles.favorite_price}>{book.price}</div>
                            </div>

                            <button className={styles.favorite_button_heart}
                                onClick={() => handleRemoveFromFavorites(book.isbn13)}>
                                <FavoriteIcon/>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default FavoritePage;