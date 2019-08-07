import React from 'react';

const GoogleBook = props => {
  return (
    <div className="catalog-list col s12 m7 z-depth-4">
      <div className="card horizontal">
        <div className="card-image">
          <img src={props.book.imageLinks ? props.book.imageLinks.thumbnail : '../../assets/default-image-book.png'} alt="book`s img"/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <div className="card-title"><p><b>{props.book.title}</b></p></div>
            {/* *ngIf="book.categories" */}
            <b>Categories: </b>
            {/* *ngFor="let categorie of book.categories" */}
            {
              (props.book.categories.length > 0) ?
              (<div className="chip">
                {props.book.categories[0]}
              </div>)
              : null
            }
            <br/>
              {/* *ngIf="book.authors" */}
              <b>Authors: </b>
              {/* *ngFor="let author of book.authors" */}
              <div className="chip">
                author
              </div>
              {/* *ngIf="book.description" */}
              <p><span><b>Description</b>:</span>book.description</p>
          </div> 
          <div className="card-action">
            <button
                className="btn add-to-pro-btn"
                // (click)="addBookToDB(book, this.userInfo.getCurrentUser())"
            >
            add to 'my list'
            </button>
            <button
                className="btn"
                // (click)="addBookToDB(book)"
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