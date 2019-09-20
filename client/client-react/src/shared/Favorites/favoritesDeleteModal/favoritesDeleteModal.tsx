import React from 'react';
import { Book } from '../../../models/book.model';

interface Props {
  book: Book[];
  close: (bookId: string) => void;
  delete: (bookId: string) => void;
}

export default function FavoritesDeleteModal(props: Props) {
  return (
    <div>
      <p>Delete book: <b>"{props.book[0].title}"</b>from favorites?</p>
      <button
        className="btn green"
        onClick={() => props.close('')}
      >
        CLose
      </button>
      <button
        className="btn red"
        onClick={() => {
          props.close('');
          props.delete(props.book[0]._id as string)
        }}
      >
        Delete
      </button>
    </div>
  )
}