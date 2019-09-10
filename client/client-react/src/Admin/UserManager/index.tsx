import React, { Props } from 'react';
import { UserService } from './../../service/users.service'
import { UserComponent } from './../../shared/UserComponent'
import { User } from './../../models/user.model'
import './style.scss';

export class UserManager extends React.Component {
  constructor(props: Props<any>) {
    super(props);
    this.userService = new UserService();

    this.state = {
      title: 'book manager',
      userList: []
    }

    this.userService.getAllUsers({pageIndex: 0, pageSize: 5})
    .then(data => {
      console.log(data[0].listOfItem);
      this.setState({
        ...this.state,
        userList: data[0].listOfItem
      })
      return data.listOfItem;
    })
  }

  public userService: UserService;

  render() {
    return (
      <div className="container">
        <div className="input-field center">
        {/* [(ngModel)]="searchString" (ngModelChange)="this.onSearchStringChange.next($event)" */}
          <input type="text" name="searchField"/>
          <label htmlFor="searchField">Enter e-mail</label>
          <br/>
        </div>
      { (this.state as any).userList.map((user: User, index: number) => { 
        return <UserComponent
        key={index}
        user={user}
        />
      })}
       <div className="container center">
            <button
            className="btn orange center"
            // (click)="openDialog()"
            >Add new user</button>
        </div>
        {/* // <mat-paginator 
        //     [length] = "paginationParams.length"
        //     [pageSize] = "paginationParams.pageSize"
        //     [pageSizeOptions] = "[3, 5, 7, 10, 25, 50]"
        //     (page) = "paginationHandler($event)">
        // </mat-paginator> */}
      </div>
    )
  }
}