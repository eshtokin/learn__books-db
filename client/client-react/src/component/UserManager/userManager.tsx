import React from 'react';
import UserService, { UserServiceClass } from '../../service/users.service'
import { UserComponent } from '../../shared/UserComponent/userComponent'
import { User } from '../../models/user.model'
import './style.scss';
import * as action from '../../store/actions/userManagerAction';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import UserEditeModal from '../../shared/UserComponent/userEditeModal/userEditeModal';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PaginationEvent } from '../../models/pagination-event.model';
import PaginationComponent from '../../shared/PaginationComponent/pagination';
import UserInfoService, { UserInfo } from '../../service/user-info.service';
import { Store } from '../../store/store';
import { UserManagerStore } from '../../store/reducers/userManagerReducer';

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


interface Props {
  store: UserManagerStore;
  user: User;
  addUser: (user: User, pagination: PaginationEvent) => void;
  editeUser: (userId: string, user: User, pagination: PaginationEvent) => void;
  deleteUser: (userId: string, pagination: PaginationEvent) => void;
  searchUserByEmail: (value: string, pagination: PaginationEvent) => void;
  getAllUsers: (pagination: PaginationEvent) => void;
}

interface State {
  userAddModal: boolean;
  searchField: string;
  pagination: PaginationEvent;
}

class UserManager extends React.Component<Props, State> {
  public userInfoService: UserInfo;
  public userService: UserServiceClass;
  public changesField: Subject<string>;

  constructor(props: Props) {
    super(props);
    
    this.state = {
      userAddModal: false,
      searchField: '',
      pagination: {
        pageIndex: 0,
        pageSize: 5,
        length: 0
      }
    }

    this.changesField = new Subject<string>()
    
    this.userInfoService = UserInfoService;
    this.userService = UserService;

    this.deleteUserFromDB = this.deleteUserFromDB.bind(this);
    this.editeUserInBD = this.editeUserInBD.bind(this);
    this.addNewUser = this.addNewUser.bind(this);

    this.userAddModal = this.userAddModal.bind(this);
  }

  UNSAFE_componentWillMount () {
    this.changesField
    .pipe(debounceTime(500))
    .subscribe((value: string) => {
      this.props.searchUserByEmail(value, this.state.pagination)
    });
  }

  componentDidMount() {
    this.props.getAllUsers(this.state.pagination)
  }

  public async deleteUserFromDB(user: User) {
    if (this.userInfoService.getCurrentUser() && (this.userInfoService.getCurrentUser() as User).id !== user._id ) {
      await this.props.deleteUser(user._id, this.state.pagination)
      this.componentDidMount();
    }
  }

  public editeUserInBD(user: User) {
    this.props.editeUser(user._id, user, this.state.pagination)
  }

  public addNewUser(user: User) {
    this.props.addUser(user, this.state.pagination)
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
      { this.props.store.usersAtPage ?
        this.props.store.usersAtPage.map((user: User, index: number) => { 
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

const mapStateToProps = (state: Store) => {
  return {
    store: {...state.userManager}
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: (user: User, pagination: PaginationEvent) => {
      dispatch(action.addUser(user))
      dispatch(action.getAllUsers(pagination))
    },
    editeUser: (userId: string, user: User, pagination: PaginationEvent) => {
      dispatch(action.editeUser(userId, user));
      dispatch(action.getAllUsers(pagination));
    },
    deleteUser: (userId: string, pagination: PaginationEvent) => {
      dispatch(action.deleteUser(userId));
      dispatch(action.getAllUsers(pagination));
    },
    searchUserByEmail: (value: string, pagination: PaginationEvent) => {
      dispatch(action.searchUserByEmail(value, pagination));
    },
    getAllUsers: (pagination: PaginationEvent) =>
      dispatch(action.getAllUsers(pagination))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)