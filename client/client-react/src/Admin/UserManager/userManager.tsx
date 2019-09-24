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
import { PaginationEvent } from '../../models/pagination-event.model';
import PaginationComponent from '../../shared/PaginationComponent/pagination';

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

interface State {
  userAddModal: boolean,
  searchField: string;
  pagination: PaginationEvent;
}

class UserManager extends React.Component<any, State> {
  public userService: UserService;
  public changesField: Subject<string>;

  constructor(props: Props<any>) {
    super(props);
    
    this.state = {
      userAddModal: false,
      searchField: '',
      pagination: {
        pageIndex: 0,
        pageSize: 5,
        length: 0,
        previousPageIndex: 0
      }
    }

    this.changesField = new Subject<string>()
    this.changesField
      .pipe(debounceTime(500))
      .subscribe((value: any) => {
        this.userService.getSomeUsers(value, this.state.pagination)
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
    this.userService.getAllUsers(this.state.pagination)
    .then(data => {
      this.props.setUsers(data[0].listOfItem);
      this.setState({
        pagination: {
          ...this.state.pagination,
          length: data[0].totalCount[0].count
        }
      })
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
    return (
      <div className="container">
        <ReactModal
        isOpen={this.state.userAddModal as boolean}
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
          <div className="container center">
            <button
            className="btn orange center"
            onClick={this.userAddModal}
            >Add new user</button>
          </div>
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
      <PaginationComponent
        pagination={this.state.pagination}
        onPageSizeChange={(pageSize: number) => {
          this.setState({
            pagination: {
              ...this.state.pagination,
              pageSize
            }
          }, this.componentDidMount)
        }}
        callback={(current, pageSize) => {
          this.setState({
            pagination: {
              ...this.state.pagination,
              pageIndex: current - 1,
              pageSize
            }
          }, this.componentDidMount)
        }}
      />
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