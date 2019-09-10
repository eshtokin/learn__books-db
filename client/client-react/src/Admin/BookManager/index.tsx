import React, { Props } from 'react';
import Filter from '../../shared/Filter';
import { BookComponent } from '../../shared/BookComponent';
import { BookService } from '../../service/books.service';
import { Book } from './../../models/book.model';

export class BookManager extends React.Component {
  constructor(props: Props<any>) {
    super(props);
    this.bookService = new BookService();

    this.state = {
      title: 'book manager',
      books: []
    }

    this.bookService.getAllBooks({pageIndex: 0, pageSize: 5})
    .then(data => {
      console.log(data.listOfItem);
      this.setState({
        ...this.state,
        books: data.listOfItem
      })
      return data.listOfItem;
    })
  }

  public bookService: BookService;

  render() {
    return (
      <div className="row">
        <Filter />
        <div className="col s10">
        {(this.state as any).books.length > 0 ?
        (this.state as any).books.map((book: Book, index: number) => {
          return (
            <BookComponent
              key={index}
              book={book}
              buttonStatus={{
                editeBtn: true, // true
                deleteBtn: true, // true
                ddToDbBtn: false,
                addToFavoriteBtn: true
              }}
            />)
          })
          : <h1>nothing</h1>}
        </div>
      </ div>
    )
  }
}