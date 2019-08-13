import  React from 'react';
import './BookManager.scss';
import { BookService } from '../../service/books.service';
import { Book } from '../../models/book.model';
import GoogleBook from '../../components/GoogleBook/GoogleBook';

class BookManager extends React.Component<{}, {
  books: Book[],
  authors: {name: string, _id: string}[],
  categories: {name: string, _id: string}[],
  filterCategories: Set<{name: string, _id: string}>,
  filterAuthors: Set<{name: string, _id: string}>,
  editeBookData: Book | object
}> {
  constructor(props: object) {
    super(props);

    this.state = {
      books: [],
      authors: [],
      categories: [],
      filterCategories: new Set(),
      filterAuthors: new Set(),
      editeBookData: {}
    }

    this.filtering = this.filtering.bind(this);
    this.chooseEditeBook = this.chooseEditeBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.editeBook = this.editeBook.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  getBooks() {
    BookService.getAllBooks()
    .then(el => {
      console.log('books: ', el);
      
      this.setState({
        books: el
      })
    });
  }

  getAuthors(): void {
    BookService.getAllAuthors()
    .then(el => {
      console.log('authors', el);
      
      this.setState({
        authors: el
      })
    });
  }

  getCategories(): void {
    BookService.getAllCategories()
    .then(el => {
      console.log('categories ', el);

      this.setState({
        categories: el
      })
    });
  }

  chooseCategory(category: {name: string, _id: string}): void {
    const status = (document.getElementById(category._id) as HTMLInputElement).checked;
    console.log(category.name, status);
    
    if (status) {
      this.setState(({ filterCategories }) => ({
        filterCategories: new Set(filterCategories).add(category)
      }));
    }
    if (!status) {
      this.setState(({ filterCategories }) => {
        const newChecked = new Set(filterCategories);
        newChecked.delete(category);
  
        return {
          filterCategories: newChecked
        };
      });
    }
  }

  chooseAuthor(author: {name: string, _id: string}): void {
    const status = (document.getElementById(author._id) as HTMLInputElement).checked;
    console.log(author.name, status);
    
    if (status) {
      this.setState(({ filterAuthors }) => ({
        filterAuthors: new Set(filterAuthors).add(author)
      }));
    }
    if (!status) {
      this.setState(({ filterAuthors }) => {
        const newChecked = new Set(filterAuthors);
        newChecked.delete(author);
  
        return {
          filterAuthors: newChecked
        };
      });
    }
  }

  filtering(): void {
    const data: {categories: string[], authors: string[]} = {
      categories: [],
      authors: []
    };
    this.state.filterCategories.forEach((category: {name: string, _id: string}) => {
      data.categories.push(category._id);
    });
    this.state.filterAuthors.forEach((author: {name: string, _id: string}) => {
      data.authors.push(author._id);
    });

    if (!(data.categories.length && data.authors.length)) {
      BookService.getAllBooks()
      .then(listOfBook => {
        this.setState({
          books: listOfBook
        })
      });
    }

    BookService.getSomeBooks(data)
    .then(list => {
      this.setState({
        books: list
      })
    });
  }

  chooseEditeBook(book: Book): void {
    const newEditeBookData: Book = {
      title: book.title,
      authors: [],
      categories: [],
      pageCount: book.pageCount,
      description: book.description,
      industryIdentifiers: book.industryIdentifiers,
      image: book.image,
      printType: book.printType
    };

    (book.authors_list as []).forEach((a: {name: string, _id: string}) => {
      newEditeBookData.authors.push(a.name);
    });

    (book.categories_list as []).forEach((c: {name: string, _id: string}) => {
      newEditeBookData.categories.push(c.name);
    });
    console.log('newEditeBookData', newEditeBookData);
    
    this.setState({
      editeBookData: newEditeBookData
    })
  }

  editeBook(): void {
    BookService.updateBook(this.state.editeBookData as Book);
    this.componentDidMount();
    // console.log(this.state.editeBookData);
    
  }

  deleteBook(book: Book): void {
    BookService.deleteBook(book);
    this.componentDidMount();
  }

  handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    let data: {
      title?: string, 
      authors?:string[], 
      categories?: string[], 
      description?: string, 
      pageCount?: string | number, 
      image?: string | ArrayBuffer
    } = this.state.editeBookData;
    
    switch (event.target.id) {
      case 'title': 
        data.title = event.target.value;
        break;
      case 'authors':
        data.authors = event.target.value.split(',');
        break;
      case 'categories':
        data.categories = event.target.value.split(',');
        break;
      case 'description':
        data.description = event.target.value;
        break;
      case 'pageCount':
        data.pageCount = event.target.value;
        break;
      case 'image':
        data.image = event.target.value;
        break;
      default:
        return;
    };
    this.setState({editeBookData: data});
  }

  componentDidMount() {
    this.getBooks();
    this.getAuthors();
    this.getCategories();
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
                    onClick={() => {this.chooseCategory(category)}}
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
                    onClick={() => {this.chooseAuthor(author)}}
                  />
                  <span>{author.name}</span>
                </label>
            )
            })
            : null
          }
          <hr/>
          <button className="btn" 
          onClick={() => {this.filtering()}}
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
                btnDelete={{flag: true, function: this.deleteBook}}
                btnEdite={{flag: true, function: this.chooseEditeBook}}
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
        onChange={this.handleInput}
        value={(this.state.editeBookData as Book).title}
        />
      </div>
      <div className="input-field">
        <label htmlFor="authors"  className="active">authors</label>    
        <input type="text" name="authors" id="authors" 
          onChange={this.handleInput}
          value={(this.state.editeBookData as Book).authors}
        />
      </div>
      <div className="input-field">
        <label htmlFor="categories" className="active">categories</label>
        <input type="text" name="categories" id="categories" 
          onChange={this.handleInput}
          value={(this.state.editeBookData as Book).categories}
        />
      </div>
      <div className="input-field">
        <label htmlFor="description" className="active">description</label>
        <input type="text" name="description" id="description"
        onChange={this.handleInput}
        value={(this.state.editeBookData as Book).description}
        />
      </div>
      <div className="input-field">
        <label htmlFor="pageCount" className="active">pages</label>
        <input type="number" name="pageCount" id="pageCount" min="0" 
          onChange={this.handleInput}
          value={(this.state.editeBookData as Book).pageCount}
        />
      </div>
      <label htmlFor="image" className="active" 
      // [ngClass]="{alredy: this.editeBookData.image}"
      >image</label>
      <input type="file" name="image" id="image"
        onChange={this.handleInput}
      />
      <hr/>
      <button className="btn btn-save-change" 
      onClick={() => {this.editeBook()}}
      >Edite</button>
    </div>
  </div>
    )
  }
}

export default BookManager;