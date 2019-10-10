import React from 'react';
import { Book } from '../../../models/book.model';
import { BookComponent } from '../../../shared/BookComponent/BookComponent';

interface Props {
  book: Book[];
  close: (bookId: string) => void;
}

export default function FavoritesDetailsModal(props: Props) {
  return (
    <div>
      <BookComponent
        book={props.book[0]}
        buttonStatus={{
          editeBtn: false,
          deleteBtn: false,
          ddToDbBtn: false,
          addToFavoriteBtn: false
        }}
        deleteFromDB={() => {}}
        addToFavorite={() => {}}
        editeBook={() => {}}
        addBookToDB={() => {}}
      />
      <button className="btn green darken-2" 
      onClick={() => props.close('')}
      >
        Close
      </button>
    </div>
  )
}