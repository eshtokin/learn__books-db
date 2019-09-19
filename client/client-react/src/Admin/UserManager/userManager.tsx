import React, { Props } from 'react';
import { UserService } from '../../service/users.service'
import { UserComponent } from '../../shared/UserComponent/userComponent'
import { User } from '../../models/user.model'
import './style.scss';
import { setUserAtPage } from '../../store/actions/userManagerAction';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import UserEditeModal from '../../shared/UserComponent/userEditeModal/userEditeModal';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    minWidth              : '550px'
  }
};

class UserManager extends React.Component<any, any> {
  public userService: UserService;
  public changesField: Subject<string>;

  constructor(props: Props<any>) {
    super(props);
    
    this.state = {
      userAddModal: false,
      searchField: ''
    }

    this.changesField = new Subject<string>()
    this.changesField
      .pipe(debounceTime(500))
      .subscribe((value: any) => {
        this.userService.getSomeUsers(value, {
          pageSize: 5,
          pageIndex: 0
        })
        .then((response: any) => {
          this.props.setUsers(response[0].listOfItem as User[])
        })
      });
    
    this.userService = new UserService();

    this.deleteUserFromDB = this.deleteUserFromDB.bind(this);
    this.editeUserInBD = this.editeUserInBD.bind(this);
    this.addNewUser = this.addNewUser.bind(this);

    this.userAddModal = this.userAddModal.bind(this);
  }

  componentDidMount() {
    this.userService.getAllUsers({pageIndex: 0, pageSize: 5})
    .then(data => {
      this.props.setUsers(data[0].listOfItem)
    })
  }

  public deleteUserFromDB(user: User) {
    this.userService.delete(user._id)
    .then(() => {
      alert('successfuly deleted');
      this.componentDidMount();
    })
  }

  public editeUserInBD(user: User) {
    this.userService.edit(user._id, user)
    .then(() => {
      alert('Changed');
      this.componentDidMount();
    })
  }

  public addNewUser(user: User) {
    this.userService.registrate(user)
    .then(() => {
      alert('New user added')
      this.componentDidMount()
    })
  }

  public userAddModal() {
    this.setState({
      userAddModal: !this.state.userAddModal
    })
  }

  render() {
    console.log('user manager' , this.props.editeUser);

    return (
      <div className="container">
        <ReactModal
        isOpen={(this.state as any).userAddModal as boolean}
        style={customStyles}
        contentLabel="User add modal"
        >
          <UserEditeModal 
            user={this.props.user}
            addBtnStatus={true}
            okBtnStatus={false}
            close={this.userAddModal}
            editeUser={this.editeUserInBD}
            addNewUser={this.addNewUser}
          />
        </ReactModal>
        <div className="input-field center">
          <input type="text" name="searchField"
          onChange={event => this.changesField.next(event.target.value)}
          />
          <label htmlFor="searchField">Enter e-mail</label>
          <br/>
        </div>
      { this.props.usersAtPage ?
        this.props.usersAtPage.map((user: User, index: number) => { 
          return <UserComponent
          key={index}
          user={user}
          deleteUser={this.deleteUserFromDB}
          editeUser={this.editeUserInBD}
          />
        })
        : null
      }
       <div className="container center">
          <button
          className="btn orange center"
          onClick={this.userAddModal}
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

const mapStateToProps = (state: any) => {
  return {
    ...state.userManagerReducer
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUsers: (list: User[]): User[] => dispatch(setUserAtPage(list))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)