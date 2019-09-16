import React, { Props } from 'react';
import { UserService } from '../../service/users.service'
import { UserComponent } from '../../shared/UserComponent'
import { User } from '../../models/user.model'
import './style.scss';
import { setUserAtPage } from '../../store/actions/userManagerAction';
import { connect } from 'react-redux';
import { store } from '../../store/store';

class UserManager extends React.Component<any, any> {
  constructor(props: Props<any>) {
    super(props);
    this.userService = new UserService();

    this.userService.getAllUsers({pageIndex: 0, pageSize: 5})
    .then(data => {
      this.props.setUsers(data[0].listOfItem)
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
      { this.props.takeUsers().map((user: User, index: number) => { 
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

interface MapStateToProps {
  userManagerreducer: {
    usersAtPage: User[]
  }
}

interface MapDispatchToProps {
  getUserList: () => User[];
  setUser: (list: User[]) => User[];
}

const mapStateToProps = (state: any) => {
  return {
    ...state.userManagerReducer
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUsers: (list: User[]): User[] => dispatch(setUserAtPage(list)),
    takeUsers: () => store.getState().userManagerReducer.usersAtPage
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)