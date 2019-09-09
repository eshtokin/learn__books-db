import React, { Props, ChangeEvent } from 'react';
import GoogleBooks from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { Book } from '../../models/book.model';
// const Filter = React.lazy(() => import('../../shared/filter'))

export class GoogleBook extends React.Component {
  constructor(
    props: Props<any>
    ) {
    super(props);
    this.googleBooks = new GoogleBooks(new BookService());
    this.state = {
      searchString:  '',
      listOfBook: [],
      paginationParams: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  public googleBooks: GoogleBooks;


  public handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      ...this.state,
      searchString: event.target.value
    })
  }
  
  public handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    this.googleBooks.searchForBook((this.state as any).searchString)
    .then(() => {
      this.setState({
        ...this.state,
        listOfBook: this.googleBooks.getPageInfo().currentItems
      })
      console.log(this.state);
    })
  }

  render() {
    return (
      <div className="container">
        <div>
          <label> Search field
            <input id="search" type="text" className="validate"
            onChange={this.handleChange}
            />
          </label>
          <button className="btn"
          onClick={this.handleClick}
          >Search</button>
        </div>
        {(this.state as any).listOfBook.map((book: Book, index: number) => {
          return (
            <p key={index}>{book.title}</p>
          )
        })}
      </div>
    )
  }
}