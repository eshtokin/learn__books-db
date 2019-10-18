import React from 'react';
import { connect } from 'react-redux';
import { Book } from '../../models/book.model';
import { BookComponent } from '../../shared/BookComponent/BookComponent';
import Filter from '../../shared/FilterComponent/FilterComponent';
import * as actions from '../../store/actions/bookManagerAction';
import { PaginationEvent } from '../../models/pagination-event.model';
import PaginationComponent from '../../shared/PaginationComponent/pagination';
import { Store } from '../../store/store';
import { History } from 'history';

interface Props {
  bookAtPage: Book[];
  history: History;
  getAllBooks: (pagination: PaginationEvent) => void;
  deleteBookFromDB: (book: Book, pagination: PaginationEvent) => void;
  bookToFromFavorite: (book: Book) => void;
  editeBook: (book: Book, pagination: PaginationEvent) => void;
}

interface State {
  pagination: PaginationEvent;
}

class BookManager extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        length: 0
      }
    }

    this.deleteBookFromDB = this.deleteBookFromDB.bind(this);
    this.addBookToFavorite = this.addBookToFavorite.bind(this);
    this.editeBookInDb = this.editeBookInDb.bind(this);
  }

  componentDidMount() {
    this.props.getAllBooks(this.state.pagination);
  }
  
  public deleteBookFromDB(book: Book) {
    this.props.deleteBookFromDB(book, this.state.pagination);
  }

  public addBookToFavorite(book: Book) {
    this.props.bookToFromFavorite(book);
  }

  public async editeBookInDb(book: Book) {
    await this.props.editeBook(book, this.state.pagination);
  }

  render() {
    return (
      <div className="row">
        <Filter
        history={this.props.history}
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
              addBookToDB={() => {}}
            />)
          })
          : <h2>Loading ...</h2>
          }
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
              }, this.componentDidMount)
            }}
          />
        </div>
      </ div>
    )
  }
}

const mapStateToProps = (state: Store) => {
  return {
    ...state.bookManager
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllBooks: (pagination: PaginationEvent) => {
      dispatch(actions.getAllBooks(pagination))
    },
    deleteBookFromDB: (book: Book, pagination: PaginationEvent) => {
      dispatch(actions.deleteBookFromDb(book));
      dispatch(actions.getAllBooks(pagination));
    },
    bookToFromFavorite: (book: Book) => {
      dispatch(actions.addDelBookFromFavorite(book))
    },
    editeBook: (book: Book, pagination: PaginationEvent) => {
      dispatch(actions.editeBook(book));
      dispatch(actions.getAllBooks(pagination))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookManager)