import React from 'react';
import { Book } from '../../../models/book.model';

interface Props {
  book: Book;
  close: () => void;
  deleteFromDB: () => void;
}

export default function DeleteModal(props: Props) {
  return (
    <div className="container center">
      Delete book from DataBase ?
      <br/>
      <b>{props.book.title}</b>

      <button className="btn green"
      onClick={props.close}>
        Cancel
      </button>
      <button className="btn red"
      onClick={props.deleteFromDB}
      >
        Delete
      </button>
    </div>
  )
}