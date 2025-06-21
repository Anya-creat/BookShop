'use client'

import Header from "./components/Header/Header";
import { BookList } from "./BookList/BookList";


export default function Home() {

  return (
    <div>
      {/* <Header /> */}
      <main>
        <BookList />
      </main>
    </div>
  );
}
