import React from 'react';
import { Book } from '../../models/book.model';

const GoogleBook = (props: {
  book: Book,
  addBook: Function
}) => {
  return (
    <div className="catalog-list col s12 m7 z-depth-4">
      <div className="card horizontal">
        <div className="card-image">
          <img src={props.book.imageLinks ? props.book.imageLinks.thumbnail : '../../assets/default-image-book.png'} alt="book`s img"/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <div className="card-title"><p><b>{props.book.title}</b></p></div>
            <b>Categories: </b>
            { (props.book.categories) ?
              props.book.categories.map((category, index) => {
                return (
                  <div className="chip" key={index}>
                    { category }
                  </div>
                )
              })
              : (
                <div className="chip">
                  unknown
                </div>
              )  }
            <br/>
              <b>Authors: </b>
              { (props.book.authors) ?
              props.book.authors.map((author, index) => {
                return (
                  <div className="chip" key={index}>
                    { author }
                  </div>
                )
              })
              : (
                <div className="chip">
                  unknown
                </div>
              ) }
              <p><span><b>Description</b>:</span>{props.book.description}</p>
          </div> 
          <div className="card-action">
            <button
                className="btn add-to-pro-btn"
                // (click)="addBookToDB(book, this.userInfo.getCurrentUser())"
                disabled={true}
            >
            add to 'my list'
            </button>
            <button
                className="btn"
                onClick={() => {props.addBook(props.book)}}
            >
            add to database
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleBook;