import React from 'react';
import Axios from 'axios';
import GoogleBook from '../components/GoogleBook/GoogleBook';

class Catalog extends React.Component {
  constructor(props) {
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
    this.show = this.show.bind(this);
  };

  inputHandler(event) {
    this.setState({
      searchString: event.target.value
    });
  };

  buttonHandler() {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchString}`;

    const params = this.state.params;
    const currentItems = [];
    let availablePages = [];  
    let currentPage;

    Axios.get(url, {params})
    .then(res => {
      res.data.items.forEach((element) => {
        currentItems.push(element.volumeInfo);
      });

      console.log('currentItems: ', currentItems)
      this.setState({
        currentItems
      })

      if (0 === params.startIndex) {
        const countPage = Math.ceil(res.data.totalItems / 20);

        for (let i = 0; i < countPage; i++) {
          availablePages.push(i);
        }
        console.log("availablePages: ", availablePages)
        this.setState({
          availablePages
        })

        currentPage = 0;
      }

      currentPage = params.startIndex / 10;

      this.setState({
        currentPage
      })
      console.log("STATE:", this.state)
      console.log('response: ', res)
      return res;
    })
    .catch(err => console.log(err));
  }

  show() {
    console.log(this.state)
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
          onClick={this.buttonHandler}
        >GO</button>
        <button 
          className="btn"
          onClick={this.show}
        >show</button>
        {/* *ngFor="let book of listOfBook" */}

        {(this.state.currentItems.length > 0) ?
          <GoogleBook book={this.state.currentItems[0]} />
          : null
        }

        
        <ul className="pagination">
          <li className="waves-effect"
            // *ngFor="let page of this.googleBooks.getPageInfo().availablePages"
            // [ngClass]="{active: (this.currentPage === page)}"
            // (click)="this.changePage(page)"
            >
            <a href="catalog">page + 1</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Catalog;