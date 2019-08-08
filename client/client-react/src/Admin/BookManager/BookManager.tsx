import  React from 'react';
import './BookManager.css';

class BookManager extends React.Component {
  render() {
    return (
      <div className="row">
  <div className="col s2 filters">
      <div className="author-input"
      //  *ngFor="let category of categories"
       >
        <input type="checkbox" 
        // id={{category._id}} (click)="chooseCategory(category)"/
        />
        <label 
        // for={{category._id}}
        >category.name</label>
      </div>
      <hr/>
      <div className="author-input"
      //  *ngFor="let author of authors"
       >
        <input type="checkbox" 
        // id={{author._id}} (click)="chooseAuthor(author)"
        />
        <label 
        // for={{author._id}}
        >author.name</label>
      </div>
      <hr/>
      <button className="btn" 
      // (click)="filtering()"
      >OK</button>
  </div>
  <div className="col s7" 
  // [ngClass]="{s10 : !this.userInfo.getStatus()}"
  >
    <div className="z-depth-4" 
    // *ngFor="let book of books"
    >
      <div className="card horizontal">
        <div className="card-image">
          <img src="{{book.image}}" className="book-image" alt="book`s img"/>
          <button 
          // (click)=chooseEditeBook(book) 
          className="btn edite-btn rework-btn"><i className="material-icons">edite</i></button>
          <button 
            // *ngIf="this.userInfo.getStatus()"
            // (click)=deleteBook(book)
            className="btn delete-btn rework-btn">
            <i className="material-icons">delete</i>
          </button>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <div className="card-title">
              <b>book.title</b>
            </div>     
            <b 
            // *ngIf="book.categories_list"
            >Categories: </b>
              <span className="chip" 
              // *ngFor="let category of book.categories_list"
              >category.name<br/></span>
            <br/>
            <b 
            // *ngIf="book.authors_list"
            >Authors: </b>
            <span className="chip" 
            // *ngFor="let author of book.authors_list"
            >
              author.name
            </span>
            <p><span 
            // *ngIf="book.description"
            ><b>Description</b>:</span> book.description</p>
            <p><b>Pages: </b>book.pageCount</p>
          </div> 
          <div className="card-action">
            <button
              className="btn add-to-pro-btn"
              // (click)="addBookToDB(book, this.userInfo.getCurrentUser())"
            >
            add to 'my list'
            </button>
          </div>
        </div>
      </div>
    </div>
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