import React from 'react';

class Profile extends React.Component {
  render() {
    return (
      <div>
          <div className="container">
          <div className="col s12 m7">
            {/* <!-- <h5 className="header">User profile</h5> --> */}
            <div className="card horizontal">
              <div className="card-image">
                <img src="https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png" alt="profile img"/>
              </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <p>Name: user.name</p>
                    <p>E-mail user.email</p>
                    <p>Status: (user.role === 1) ? 'admin' : 'user'</p>
                  </div>
                  <div className="card-action">
                  </div>
                </div>
            </div>
          </div>            
        </div>
        <div className="container">
          <p>My book list:</p>
          {/* let books of book */}
          <div className="card horizontal">
            <div className="card-image">
              <img src="{{book.image}}" alt="books img" className="book-image"/>
              <button
                className="btn delete-btn rework-btn">
                <i className="material-icons">delete</i>
              </button>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <div className="card-title">
                  {/* <b>{{book.title}}</b> */}
                  book.title
                </div>     
                {/* if categories.list */}
                  <b>Categories: </b>
                  {/* *ngFor="let category of book.categories_list" */}
                    <span className="chip">category.name<br /></span>
                  <br />
                  {/* *ngIf="book.authors_list" */}
                  <b>Authors: </b>
                  {/*  *ngFor="let author of book.authors_list" */}
                  <span className="chip">
                  author.name
                  </span>
                  {/* *ngIf="book.description" */}
                  <p><span><b>Description</b>:</span>book.description</p>
                  <p><b>Pages: </b>book.pageCount</p>
                </div> 
                <div className="card-action">
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;