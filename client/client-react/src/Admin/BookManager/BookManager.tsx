import  React from 'react';
import './BookManager.scss';
import { BookService } from '../../service/books.service';
import { Book } from '../../models/book.model';
import GoogleBook from '../../components/GoogleBook/GoogleBook';

class BookManager extends React.Component<{}, {
  books: Book[],
  authors: {name: string, _id: string}[],
  categories: {name: string, _id: string}[]
}> {
  constructor(props: object) {
    super(props);

    this.state = {
      books: [],
      authors: [],
      categories: []
    }
  }

  getBooks() {
    BookService.getAllBooks()
    .then(el => {
      // this.books = el.slice();
      this.setState({
        books: el
      })
    });
  }

  getAuthors(): void {
    BookService.getAllAuthors()
    .then(el => {
      this.setState({
        authors: el
      })
    });
  }

  getCategories(): void {
    BookService.getAllCategories()
    .then(el => {
      this.setState({
        categories: el
      })
    });
  }

  chooseCategory() {

  }

  componentDidMount() {
    this.getBooks();
    this.getAuthors();
    this.getCategories();
    setTimeout(() => {
      console.log(this.state);
    }, 1000);
  }

  render() {
    return (
      <div className="row">
        <div className="col s2 filters">
          <div className="categories-input">
          {
            this.state.categories.length ?
            this.state.categories.map((category, index: number) => {
            return (
                <label 
                  key={index}
                  htmlFor={category._id}
                >
                  <input 
                    type="checkbox" 
                    id={category._id}
                    onClick={() => {this.chooseCategory()}}
                  />
                  <span>{category.name}</span>
                </label>
            )
            })
            : null
          }
          </div>
          <hr/>
          {
            this.state.authors.length ?
            this.state.authors.map((author, index: number) => {
            return (
                <label 
                  key={index}
                  htmlFor={author._id}
                >
                  <input 
                    type="checkbox" 
                    id={author._id}
                    onClick={() => {this.chooseCategory()}}
                  />
                  <span>{author.name}</span>
                </label>
            )
            })
            : null
          }
          <hr/>
          <button className="btn" 
          // (click)="filtering()"
          >OK</button>
        </div>
      <div className="col s7"
      // [ngClass]="{s10 : !this.userInfo.getStatus()}"
      >
      {
        this.state.books.length ?
        this.state.books.map((book: Book, index) => {
          return (
              <GoogleBook 
                book={book}
                addBook={()=>{}}
                btnDelete={true}
                btnEdite={true}
                inProfile={false}
                key={index}
              />
          )
        })
        : null
      }
    
  </div>
    <div 
    // *ngIf="this.userInfo.getStatus()" 
    className="col s3">
      <div className="input-field">
        <label htmlFor="title" className="active">title</label>
        <input type="text" name="title" id="title" 
        // [(ngModel)]="editeBookData.title"
        />
      </div>
      <div className="input-field">
        <label htmlFor="authors"  className="active">authors</label>    
        <input type="text" name="authors" id="authors" 
        // [(ngModel)]="editeBookData.authors"
        />
      </div>
      <div className="input-field">
        <label htmlFor="categories" className="active">categories</label>
        <input type="text" name="categories" id="categories" 
        // [(ngModel)]="editeBookData.categories" 
        />
      </div>
      <div className="input-field">
        <label htmlFor="description" className="active">description</label>
        <input type="text" name="description" id="description"
        //  [(ngModel)]="editeBookData.description"
        />
      </div>
      <div className="input-field">
        <label htmlFor="pageCount" className="active">pages</label>
        <input type="number" name="pageCount" id="pageCount" min="0" 
        // [(ngModel)]="editeBookData.pageCount"
        />
      </div>
      <label htmlFor="image" className="active" 
      // [ngClass]="{alredy: this.editeBookData.image}"
      >image</label>
      <input type="file" name="image" id="image"
      //  (change)="uploadFile($event)"
      />
      <hr/>
      <button className="btn btn-save-change" 
      // (click)="editeBook()"
      >Edite</button>
    </div>
  </div>
    )
  }
}

export default BookManager;