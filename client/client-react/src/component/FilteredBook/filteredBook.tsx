import React from 'react';
import { connect } from 'react-redux';
import { Book } from '../../models/book.model';
import { BookComponent } from '../../shared/BookComponent/BookComponent';
import Filter from '../../shared/FilterComponent/FilterComponent';
import * as actions from '../../store/actions/filteredBookAction';
import { PaginationEvent } from '../../models/pagination-event.model';
import PaginationComponent from '../../shared/PaginationComponent/pagination';
import './style.scss';
import { History } from 'history';
import { Store } from '../../store/store';
import { FilteredBooksState } from '../../store/reducers/filteredBooksReducer';

interface Props {
  history: History;
  store: FilteredBooksState;
  editeBook: (book: Book) => void;
  deleteBook: (book: Book) => void;
  bookToFromFavorites: (book: Book) => void;
  getSomeBooks: (searchString: string, pagination: PaginationEvent) => void;
}

interface State {
  pagination: PaginationEvent;
  searchQuery: string;
}

class FilteredBook extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        length: 0
      },
      searchQuery: ''
    }

    this.addBookToFavorite = this.addBookToFavorite.bind(this);
    this.deleteBookFromDB = this.deleteBookFromDB.bind(this);
    this.editeBook = this.editeBook.bind(this);
  }

  componentDidMount() {
    this.getSomeBooks()
  }
  
  public async getSomeBooks(): Promise<void> {
    const searchQuery = this.props.history.location.search;
    await this.setState({
      searchQuery
    });
    await this.props.getSomeBooks(searchQuery, this.state.pagination);
  }
  
  public deleteBookFromDB(book: Book): void {
    this.props.deleteBook(book)
    this.getSomeBooks();
  }

  public addBookToFavorite(book: Book): void {
    this.props.bookToFromFavorites(book);
  }

  public async editeBook(book: Book): Promise<void>{
    await this.props.editeBook(book);
    await this.props.getSomeBooks(this.props.history.location.search, this.state.pagination);
  }

  render() {
    return (
      <div className="row">
        <Filter
          history={this.props.history}
          getSomeBooks={this.getSomeBooks.bind(this)}
        />
        <div className="col s10 filteredBookContent">
          {this.props.store.books.length > 0 ?
            this.props.store.books.map((book: Book, index: number) => {
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
                  editeBook={this.editeBook}
                  addBookToDB={() => {}}
                />)
            })
            : <h1>No overlap...</h1>}
            <PaginationComponent
              pagination={this.state.pagination}
              onPageSizeChange={(pageSize: number) => {
                this.setState({
                  pagination: {
                    ...this.state.pagination,
                    pageSize
                  }
                }, this.componentDidMount)
              }}
              callback={(current, pageSize) => {
                this.setState({
                  pagination: {
                    ...this.state.pagination,
                    pageIndex: current - 1,
                    pageSize
                  }
                }, this.getSomeBooks)
              }}
            />
        </div>
      </ div>
    )
  }
}

const mapStateToProps = (state: Store) => {
  return {
    store: {...state.filteredBook}
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    editeBook: (book: Book) => {
      dispatch(actions.editeBook(book));
    },
    deleteBook: (book: Book) => {
      dispatch(actions.deleteBook(book))
    },
    bookToFromFavorites: (book: Book) => {
      dispatch(actions.addDelBookFromFavorite(book))
    },
    getSomeBooks: (searchString: string, pagination: PaginationEvent) => {
      dispatch(actions.getSomeBooks(searchString, pagination))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilteredBook)