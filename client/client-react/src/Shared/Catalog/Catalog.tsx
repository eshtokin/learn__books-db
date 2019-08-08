import React from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import GoogleBook from '../../components/GoogleBook/GoogleBook';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';

type CatalogProps = {
  searchString: string,
  currentItems: Book[],
  availablePages: number[],
  currentPage: number,
  params: {
    startIndex: number,
    maxResult: number
  }
}

class Catalog extends React.Component<{}, CatalogProps> {
  constructor(props: CatalogProps) {
    super(props);

    this.state = {
      searchString: 'witcher',
      currentItems: [],
      availablePages: [],
      currentPage: 0,
      params: {
        startIndex: 0,
        maxResult: 10
      }
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
  };

  inputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchString: event.target.value
    });
  };

  buttonHandler(params: {startIndex: number, maxResult: number}) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchString}`;
    const currentItems: Book[] = [];
    let availablePages: number[] = [];  
    let currentPage;

    Axios.get(url, {params})
    .then(res => {
      res.data.items.forEach((element: {volumeInfo: Book}) => {
        currentItems.push(element.volumeInfo);
      });

      if (0 === params.startIndex) {
        const countPage = Math.ceil(res.data.totalItems / 20);

        for (let i = 0; i < countPage; i++) {
          availablePages.push(i);
        }

        this.setState({
          availablePages
        })

        currentPage = 0;
      }

      currentPage = params.startIndex / 10;

      this.setState({
        currentItems,
        currentPage
      })
      return res;
    })
    .catch(err => console.log(err));
  }

  changePage(page: number) {
    this.setState({ currentPage: page });

    this.buttonHandler({
      startIndex: page*10,
      maxResult: 10
    });
  }

  addBookToDB(cbook: Book, user: User) { // user in ardument
    console.log('book: ', cbook, 'user: ', user)
    const book = {
      title: cbook.title.toLowerCase(),
      authors: cbook.authors.map((element: string) => element.toLowerCase()),
      categories: cbook.categories ? cbook.categories.map((element: string) => element.toLowerCase()) : [],
      description: cbook.description,
      image: cbook.imageLinks ? cbook.imageLinks.thumbnail : '',
      pageCount: cbook.pageCount,
      printType: cbook.printType.toLowerCase(),
      industryIdentifiers: cbook.industryIdentifiers
    };
    // this.booksService.addBookToDB(newBook, user);
    
    Axios.post('http://localhost:3000/books', {book, user})
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
  } 

  render() {
    return (
      <div className="container">
        <div className="input-field">
          <input 
            id="search" 
            type="text" 
            className="validate"
            onChange={this.inputHandler}
          />
          <label htmlFor="search">Search field</label>
        </div>
        <button 
          className="btn"
          onClick={()=> {this.buttonHandler(this.state.params)}}
        >GO
        </button>

        { this.state.currentItems.map((item, index) => {
          return (
            <GoogleBook book={item} key={index} addBook={this.addBookToDB} />
          )
        }) }
        
        <ul className="pagination">
          { this.state.availablePages ?
            this.state.availablePages.map((page, index) => {
              return (
                <li 
                  className={(this.state.currentPage === page) ? "waves-effect active" : "waves-effect"}
                  key={index}
                  onClick={() => {this.changePage(page)}}
                  >
                  <NavLink to="/catalog">{page + 1}</NavLink>
                </li>
              )
            })
            : null
          }        
        </ul>
      </div>
    )
  }
}

export default Catalog;