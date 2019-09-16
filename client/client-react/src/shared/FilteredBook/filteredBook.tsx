import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { User } from '../../models/user.model';
import { Book } from '../../models/book.model';
import { UserService } from '../../service/users.service';
import { BookService } from '../../service/books.service';
import { UserInfoService } from '../../service/user-info.service';
import { BookComponent } from '../BookComponent/BookComponent';
import Filter from '../FilterComponent/FilterComponent';
import { setBook } from '../../store/actions/filteredBookAction';


class FilteredBook extends React.Component<any, any>{
  public userInfoService: UserInfoService;
  public userService: UserService;
  public bookService: BookService;

  constructor(props: any) {
    super(props);

    this.userInfoService = new UserInfoService()
    this.userService = new UserService();
    this.bookService = new BookService();

    this.addBookToFavorite = this.addBookToFavorite.bind(this);
  }

  componentDidMount() {
    this.getSomeBooks()
  }


  public getSomeBooks(): void {
    const linkParams = queryString.parse(this.props.history.location.search);
    const data = {
      'authors[]': linkParams.authors as string[] || [],
      'categories[]': linkParams.categories as string[] || [],
      title: linkParams.title as string || '',
      pagination: {
        pageIndex: 0,
        pageSize: 5,
        length: 5,
        previousPageIndex: 0
      }
    };
    let favoritesId: string | string[] = [];
    this.bookService.getSomeBooks(data)
    .then((el: any) => {

      this.userService.getUser((this.userInfoService.getCurrentUser() as User).id as string)
      .then((user: User) => {
        favoritesId = user.books as string[];
        const listOfBook = el[0].listOfItem.map((book: Book) => {
            return {
              ...book,
              inFavorite: (favoritesId as string[]).indexOf(book._id as string) === -1 ? false : true
            };
          })

        this.props.setBook(listOfBook)
        
        if (el[0].totalCount[0]) {
          data.pagination.length = el[0].totalCount[0].count;
        }
      });
    });
  }
  
  public deleteBookFromDB(data: Book) {
    this.bookService.deleteBook(data)
    .then(console.log)
  }

  public addBookToFavorite(book: Book) {
    if (!book.inFavorite) {
      this.userService.addBookToProfile(book)
      .then(() => this.componentDidMount())
    } else {
      this.userService.getUser((this.userInfoService.getCurrentUser() as User).id as string)
      .then(user => {
        user.books = (user.books as string[]).filter(bookId => {
          return bookId !== book._id;
        })
        this.userService.edit(user._id, user)
        .then(() => this.componentDidMount())
      })
    }
    book.inFavorite = !book.inFavorite;
  }

  render() {
    return (
      <div className="row">
        <Filter
          {...this.props.history}
          getSomeBooks={this.getSomeBooks.bind(this)}
        />
        <div className="col s10">
          {this.props.books.length > 0 ?
            this.props.books.map((book: Book, index: number) => {
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
                  deleteFromDB={this.deleteBookFromDB}
                  addToFavorite={this.addBookToFavorite}
                />)
            })
            : <h1>nothing</h1>}
        </div>
      </ div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    ...state.filteredBookReducer
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setBook: (list: Book[]) => dispatch(setBook(list))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilteredBook)