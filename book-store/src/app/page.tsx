'use client'
import { useState } from "react";
import Header from "./components/Header/Header";
import { BookList } from "./features/books/components/BookList/BookList";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <Header/>
      <main>
        <BookList/>
      </main>
    </div>
  );
}
