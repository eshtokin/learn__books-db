import React, { Props } from 'react';
import Filter from '../../shared/filter';
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
      <div>
        <Filter />
        {
          (this.state as any).books.length > 0 ?
          (this.state as any).books.map((book: Book, index: number) => {
            return <div key={index}>
              <BookComponent
              book={book}
              buttonStatus={{
                editeBtn: true,
                deleteBtn: true,
                ddToDbBtn: false,
                addToFavoriteBtn: true
              }}
              />
            </div> 
          })
          : <h1>nothing</h1>
        }
      </ div>
    )
  }
}