export interface IBook {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export interface IBookDetails {
  error: string;
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  isbn10: string;
  isbn13: string;
  pages: string;
  year: string;
  rating: string;
  desc: string;
  price: string;
  image: string;
  url: string;
  pdf: {
    [key: string]: string;
  };
}

export interface IBooksState {
  books: IBook[];
  selectedBook: IBookDetails | null;
  loading: boolean;
  error: string | null;
  favorites: string[];
  cart: ICartItem[];
}

export interface ICartItem {
  isbn13: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}