import React from 'react';
import { UserService } from '../../service/users.service';
import { UserInfoService } from '../../service/user-info.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../../models/user.model';
import { PaginationEvent } from '../../models/pagination-event.model';

interface State {
  pagination: PaginationEvent
}

export default class Favorites extends React.Component<any, State> {
  public userInfoService: UserInfoService;
  public userService: UserService;
  public onSearchFieldChange: Subject<string>;

  constructor(props: any) {
    super(props);

    this.state = {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
        length: 0
      }
    };

    this.onSearchFieldChange = new Subject<string>();
    this.onSearchFieldChange
    .pipe(debounceTime(500))
    .subscribe((value: string) => {
      console.log(value);
      
    });

    this.userService = new UserService();
    this.userInfoService = new UserInfoService();
  }

  componentDidMount() {
    this.userService.getUser((this.userInfoService.getCurrentUser() as User).id as string)
    .then((user) => {
      
      if ((user.books as string[]).length > 0) {
        this.userService.getUserBooks(user.books as string[], this.state.pagination)
        .then(data => {
          
        })
      }
    })
  }

  render() {
    return (
        <div className="container">
          <h3>Your list is empty</h3>
          <div className="input-field">
              <input type="text" id="text" 
              onChange={event => this.onSearchFieldChange.next(event.target.value)}
              />
              <label htmlFor="text">Seaarch field</label>
          </div>
          <p className="favoritesText">Favorites: </p>
          <ul className="book-card">
            <li
            className="row book-element"
            >
              {/* <img src={book.image} alt="book image" className="book-image col s3" /> */}
              <p className="col s6">
                <b>
                  {/* {book.title} */}
                </b>
              </p>
              <p className="description  col s7">
                {/* <b>Categories:</b> <span className="chip">{category.name}</span> */}
                <br />
                {/* <b>Authors:</b> <span  className="chip">{author.name}</span>  */}
              </p>
              <div className="col s2 center btn-section">
                <button className="btn green">
                  Details
                </button>
                <button className="btn red">
                  <i className="material-icons">
                    delete
                  </i>
                </button>
              </div>
            </li>
          </ul>
        </div>
    )
  }
}