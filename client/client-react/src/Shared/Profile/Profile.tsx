import React from 'react';
import './Profile.css'
import UserService from '../../service/user.service';
import { UserInfo } from '../../service/user-info.service';
import { User } from '../../models/user.model';
import { Book } from '../../models/book.model';
import GoogleBook from '../../components/GoogleBook/GoogleBook';

type ProfileProps = {
  userBooks: string[],
  user: User,
  books: Book[] | []
}

class Profile extends React.Component<{}, ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);

    this.state = {
      user: {
        books: [''],
        email: '',
        image: '',
        name: '',
        password: '',
        role: 0,
        _id: '',
        id: ''
      },
      userBooks: [],
      books: []
    }
  }

  componentDidMount() {
    const userInfo = UserInfo;
    const userId = userInfo.getCurrentUser().id;
    
    UserService.getUser(userId)
    .then((userData: User) => {
      this.setState({user: userData});
      console.log("books: ", this.state.user.books);

      if ((this.state.user.books as []).length > 0) {
        UserService.getUserBooks(this.state.user.books)
        .then((books: Book[]) => {
          this.setState({
            books
          })
        });
      }
      // if (user.books.length === 0) {
      //   this.books = [];
      // }
    })
  }

  render() {
    return (
      <div>
          <div className="container">
          <div className="col s12 m7">
            <div className="card horizontal">
              <div className="card-image">
                <img src="https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png" alt="profile img"/>
              </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <p>Name: {this.state.user.name}</p>
                    <p>E-mail {this.state.user.email}</p>
                    <p>Status: {(this.state.user.role === 1) ? 'admin' : 'user'}</p>
                  </div>
                  <div className="card-action">
                  </div>
                </div>
            </div>
          </div>            
        </div>
        <div className="container">
          <p>My book list:</p>
          <ul className="">
            { this.state.books ?
              (this.state.books as []).map((book: Book, index: number) => {
                return (
                  <li
                    key={index}
                    >
                    <GoogleBook 
                      book={book} 
                      key={index}
                      inProfile={true}
                      btnDelete={{flag: true}}
                      btnEdite={{flag: false}}
                      addBook={()=>(console.log('some function'))}
                    />
                  </li>
                )
              })
              : null
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Profile;