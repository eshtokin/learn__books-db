import React from 'react';
import { connect } from 'react-redux';
import { Book } from '../../models/book.model';
import { BookComponent } from '../../shared/BookComponent/BookComponent';
import { BookService } from '../../service/books.service';
import { UserService } from '../../service/users.service';
import Filter from '../../shared/FilterComponent/FilterComponent';
import { setBookAtPage, deleteBookFromState, favoriteFlagToggle } from '../../store/actions/bookManagerAction';
import { UserInfoService } from '../../service/user-info.service';
import { User } from '../../models/user.model';

class BookManager extends React.Component<any, any>{
  public userService: UserService;
  public bookService: BookService;
  public userInfoService: UserInfoService;
  
  constructor(props: any) {
    super(props);
    this.userService = new UserService();
    this.bookService = new BookService();
    this.userInfoService = new UserInfoService();

    this.deleteBookFromDB = this.deleteBookFromDB.bind(this);
    this.addBookToFavorite = this.addBookToFavorite.bind(this);
  }

  componentWillMount() {
    this.getBooks()
  }

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
  
  public deleteBookFromDB(book: Book) {
    this.bookService.deleteBook(book)
    .then(response => {
      response.status === 200
      ? this.props.deleteBookFromState(book._id)
      : console.log("Book don't deleted. ")
    })
  }


  public addBookToFavorite(book: Book) {
    !book.inFavorite
    ? this.userService.addBookToProfile(book)
    : this.deleteBookFromFavorite(book._id as string)
   
    // .then(() => {
    //   this.props.favoriteFlagToggle(book._id)
    // });
    this.props.favoriteFlagToggle(book._id)
  }

  public deleteBookFromFavorite(bookId: string) {
    let restOfBook: string[] = [];
    this.userService.getUserFavoriteBooks()
    .then(list => {
      restOfBook = list.filter((id: string) => {
        return id !== bookId
      })
    
      this.userService.getUser((this.userInfoService.getCurrentUser() as User).id as string)
      .then(user => {
        user.books = restOfBook
        this.userService.edit(user._id, user)
        .then(console.log)
      })
    });
  }


  public editeBookInDb(book: Book) {
    this.bookService.updateBook(book)
    .then(() => {
      this.componentWillMount();
    })
  }

  render() {
    return (
      <div className="row">
        <Filter
        {...this.props.history}
        getSomeBooks={()=> {}}
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
              deleteFromDB={this.deleteBookFromDB}
              addToFavorite={this.addBookToFavorite}
              editeBook={this.editeBookInDb} 
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
    ...state.bookManagerReducer
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setBook: (list: Book[]) => dispatch(setBookAtPage(list)),
    deleteBookFromState: (bookId: string) => dispatch(deleteBookFromState(bookId)),
    favoriteFlagToggle: (bookId: string) => dispatch(favoriteFlagToggle(bookId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookManager)