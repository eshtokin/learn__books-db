import React from 'react';
import { Book } from '../../models/book.model';
import './GoogleBook.scss'
import {UserInfo} from '../../service/user-info.service';
import { createCoverageSummary } from 'istanbul-lib-coverage';

const GoogleBook = (props: {
  book: Book,
  addBook: Function,
  btnDelete: boolean,
  btnEdite: boolean,
  inProfile: boolean
}) => {
  return (
    // <div className="catalog-list col s12 m7 z-depth-4">
    <div className="z-depth-4">
      <div className="card horizontal">
        <div className="card-image book-image">
          <img 
            src={props.book.image ? (props.book.image as string) : (props.book.imageLinks as {thumbnail: string}).thumbnail}
            alt="book`s img"
          />
          {
            props.btnEdite ?
            <button 
              // *ngIf="this.userInfo.getStatus()"
              // (click)=deleteBookFromProfile(book)
              className="btn edite-btn rework-btn">
              <i className="material-icons">edite</i>
            </button>
            : null
          }
          {
            props.btnDelete ?
            <button 
              // *ngIf="this.userInfo.getStatus()"
              // (click)=deleteBookFromProfile(book)
              className="btn delete-btn rework-btn">
              <i className="material-icons">delete</i>
            </button>
            : null
          }
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <div className="card-title"><p><b>{props.book.title}</b></p></div>
            <b>Categories: </b>
            { 
              props.book.categories_list ?
              (props.book.categories_list as {name: string, _id: string}[]).map((category, index) => {
                return (
                  <div className="chip" key={index}>
                    {category.name}
                  </div>
                )
              })
              : props.book.categories ?
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
              )  
            }
            <br/>
              <b>Authors: </b>
              { 
                props.book.author_list?
                (props.book.categories_list as {name: string, _id: string}[]).map((category, index) => {
                  return (
                    <div className="chip" key={index}>
                      {category.name}
                    </div>
                  )
                })
                : props.book.authors ?
                props.book.authors.map((category, index) => {
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
                )  
              }
              <p><span><b>Description</b>:</span>{props.book.description}</p>
          </div>
          <div className="card-action">
          {
            !props.inProfile ?
            <div>
              <button
                className="btn add-to-pro-btn"
                onClick={() => {props.addBook(props.book, UserInfo.getCurrentUser())}}
                disabled={false}
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
            : null
          }
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleBook;