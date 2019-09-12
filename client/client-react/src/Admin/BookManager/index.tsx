import React from 'react';
import Filter from '../../shared/Filter';
import { BookComponent } from '../../shared/BookComponent';
import { BookService } from '../../service/books.service';
import { Book } from './../../models/book.model';
import { connect } from 'react-redux';
import { store } from '../../store/store';
import { UserService } from '../../service/users.service';
import { setBookAtPage } from '../../store/actions/bookManagerAction';

// class BookManager extends React.Component<BookManagerStore & DispatchToProps>{
class BookManager extends React.Component<any, any>{
  constructor(props: any) {
    super(props);
    this.userService = new UserService();
    this.bookService = new BookService();
  }

  componentWillMount() {
    console.log("Book manager 0")

    this.bookService.getAllBooks({pageIndex: 0, pageSize: 5})
    .then(data => {
      this.props.setBook(data.listOfItem as Book[]);
    })
  }

  public userService: UserService;
  public bookService: BookService;

  public getBooks(): void {
    this.bookService.getAllBooks({pageIndex: 0, pageSize: 5})
      .then((el) => {
        this.userService.getUserFavoriteBooks()
          .then(favoriteBooks => {
            this.props.setBook( (el.listOfItem as Book[]).map(book => {
              return {
                ...book,
                inFavorite: favoriteBooks.indexOf(book._id as string) === -1 ? false : true
              };
            }));
          });
      });
  }
  
  render() {
    console.log(this.props)
    return (
      <div className="row">
        <Filter
        // getAllBooks={this.getBooks.bind(this)}
        {...this.props.history}
        //getFilteredBooks={this.getFilteredBooks.bind(this)}
        // props={this.props}
        />
        <div className="col s10">
        {this.props.bookAtPage.length > 0 ?
        this.props.bookAtPage.map((book: Book, index: number) => {
          return (
            <BookComponent
              key={index}
              book={book}
              buttonStatus={{
                editeBtn: true,
                deleteBtn: true,
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

interface DispatchToProps {
  setBook: (list: Book[]) => any 
};

const mapStateToProps = (state: any) => {
  return {
    ...state.bookManagerReducer
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setBook: (list: Book[]) => dispatch(setBookAtPage(list)),
    takeBooks: () => store.getState().bookManagerReducer
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookManager)