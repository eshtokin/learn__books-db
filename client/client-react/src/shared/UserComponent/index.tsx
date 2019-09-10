import React from 'react';
import { User } from "../../models/user.model";
import { Book } from "../../models/book.model";
import { UserDeleteModal } from './UserDeleteModal';
import { scrollToggle } from './../../service/scroll.service'

interface BookProps {
  user: User;
  // buttonStatus: {
  //   editeBtn: boolean,
  //   deleteBtn: boolean,
  //   ddToDbBtn: boolean,
  //   addToFavoriteBtn: boolean
  // }
}

export class UserComponent extends React.Component<BookProps> {
  constructor(props: BookProps) {
    super(props as BookProps);
    
    this.state = {
      user: {},
      // addBookToFavorite: false,
      // deleteFromFavorites: false,
      // bookDeleteModal: false,
      userDeleteModal: false
    };

    // this.addBookToFavorite = this.addBookToFavorite.bind(this);
    // this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    // this.bookDeleteModal = this.bookDeleteModal.bind(this);
    this.userDeleteModal = this.userDeleteModal.bind(this);
  }

  // public addBookToFavorite(): void {
  //   this.setState({
  //     addBookToFavorite: !(this.state as any).addBookToFavorite
  //   })
  // }

  // public deleteFromFavorites(): void {
  //   this.setState({
  //     deleteFromFavorites: !(this.state as any).deleteFromFavorites
  //   })
  // }

  // public bookDeleteModal(): void {
  //   this.setState({
  //     bookDeleteModal: !(this.state as any).bookDeleteModal
  //   })
  // }

  public userDeleteModal(): void {
    if (!(this.state as any).userDeleteModal) {
      scrollToggle().hide()
    } else {
      scrollToggle().visible()
    }
    this.setState({
      userDeleteModal: !(this.state as any).userDeleteModal
    })
  }

  render() {
    return (
      <div className="z-depth-4 bookComponent">
        <UserDeleteModal 
          show={(this.state as any).userDeleteModal as boolean}
          userEmail={this.props.user.email}
          onClose={this.userDeleteModal}
        />
        {/* <BookDeleteFromFavModal 
          show={(this.state as any).deleteFromFavorites as boolean}
          title={this.props.book.title}
          onClose={this.deleteFromFavorites}
        /> */}
        <div className="card horizontal z-depth-4">
          <div className="card-image col s4">
          <img src={(this.state as any).user.image || 'https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png'} className="user-image" alt="userImage" />
            <button 
            // (click)="openDialog(user)"
            className="btn edite-btn rework-btn">
              <i className="material-icons">edite</i>
            </button>
            <button 
            // (click)="confirmDialog(user._id, user.email)"
            className="btn delete-btn rework-btn"
            onClick={this.userDeleteModal}>
              <i className="material-icons">delete</i>
            </button>
          </div>
          <div className="card-stacked col s8">
            <div className="card-content">
              <div className="card-title">
                <b>{this.props.user.name}</b>
                <br/>
                <span><small>({this.props.user.role === 1 ? 'admin' : 'user'})</small></span>
              </div>
              <p><b>E-mail: </b>{this.props.user.email}</p>
              <ul> 
                <span><b>List of books:</b></span>
                {(this.props.user.book_list as Book[]).map(book => {
                  return <li>
                    {book.title}
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}