import { FunctionComponent } from "react";
import React from "react";
import './style.scss'
import { Book } from "../../models/book.model";
import { CategoryAuthor } from './../../models/category-author.model';
interface BookProps {
  book: Book;
  buttonStatus: {
    editeBtn: boolean,
    deleteBtn: boolean,
    ddToDbBtn: boolean,
    addToFavoriteBtn: boolean
  }
}

export const BookComponent: FunctionComponent<BookProps> = ({book, buttonStatus}) => {
  const bookCategories: CategoryAuthor[] = book.categories_list as CategoryAuthor[];

  return (
    <div className="z-depth-4">
      <div className="card horizontal">
        <div className="card-image">
          <img alt="Bookimage" src={book.image as string} className="book-image" />
          {
            buttonStatus.editeBtn ?
            <button
              // (click)="chooseEditeBook(book)"
              className="btn edite-btn rework-btn"
              >
              <i className="material-icons">edite</i>
            </button>
            : null
          }
          {
            buttonStatus.editeBtn ?
            <button 
            // (click)="deleteDialog(book)"
            className="btn delete-btn rework-btn"
            >
              <i className="material-icons">delete</i>
            </button>
            : null
          }
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <div className="card-title">
              <b>{book.title}</b>
            </div>
            {
              (book.categories_list as CategoryAuthor[]).length ?
              <>
                <b>Categories: </b>
                {bookCategories.map((category: CategoryAuthor, index: number) => {
                return (
                  <span key={index}>{category.name}</span>
                )
                })}
              </>
              : null
            }
            <br />
            {
              book.authors_list as CategoryAuthor[] ?
              <>
                <b>Author: </b>
                {(book.authors_list as CategoryAuthor[]).map((author: CategoryAuthor, index: number) => {
                return (
                  <span key={index}>{author.name}</span>
                )
                })}
              </>
              : null
            }
            <p className="book-description"><span // *ngIf="book.description"
            ><b>Description</b>:</span> {book.description}</p>
            <p><b>Pages: </b>{book.pageCount}</p>
          </div> 
          <div className="card-action">
            
            <button
              //*ngIf="buttonStatus.addToFavoriteBtn  && !book.inFavorite"
              className="btn green add-to-pro-btn"
              // (click)="addBookToFavorite(book)"
            >
            add to 'My favorites'
            </button>
            <button
              // *ngIf="buttonStatus.addToFavoriteBtn && book.inFavorite"
              className="btn red add-to-pro-btn"
              // (click)="deleteFromFavorites(book)"
            >
            delete from 'My favorites'
            </button>

            <button
              //*ngIf="buttonStatus.addToDbBtn"
              className="btn add-to-pro-btn"
              // [disabled]="book.alreadyExistInBD"
              // (click)="addBookToDB(book)"
            >
            add to DB
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}