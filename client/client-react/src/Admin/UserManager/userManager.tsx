import React, { Props } from 'react';
import { UserService } from '../../service/users.service'
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
import { UserInfoService } from '../../service/user-info.service';

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
  userAddModal: boolean;
  searchField: string;
  pagination: PaginationEvent;
}

class UserManager extends React.Component<any, State> {
  public userInfoService: UserInfoService;
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
        length: 0
      }
    }

    this.changesField = new Subject<string>()
    
    this.userInfoService = new UserInfoService();
    this.userService = new UserService();

    this.deleteUserFromDB = this.deleteUserFromDB.bind(this);
    this.editeUserInBD = this.editeUserInBD.bind(this);
    this.addNewUser = this.addNewUser.bind(this);

    this.userAddModal = this.userAddModal.bind(this);
  }

  UNSAFE_componentWillMount () {
    this.changesField
    .pipe(debounceTime(500))
    .subscribe((value: any) => {
      this.props.searchUserByEmail(value, this.state.pagination)
    });
  }

  componentDidMount() {
    this.props.getAllUsers(this.state.pagination)
  }

  public async deleteUserFromDB(user: User) {
    if (this.userInfoService.getCurrentUser() && (this.userInfoService.getCurrentUser() as User).id !== user._id ) {
      await this.props.deleteUser(user._id)
      this.componentDidMount();
    }
  }

  public editeUserInBD(user: User) {
    this.props.editeUser(user._id, user)
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
    ...state.userManager
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: async (user: User, pagination: PaginationEvent) => {
      await dispatch(action.addUser(user))
      await dispatch(action.getAllUsers(pagination))
    },
    editeUser: async (userId: string, user: User, pagination: PaginationEvent) => {
      await dispatch(action.editeUser(userId, user));
      await dispatch(action.getAllUsers(pagination));
    },
    deleteUser: async (userId: string, pagination: PaginationEvent) => {
      await dispatch(action.deleteUser(userId));
      await dispatch(action.getAllUsers(pagination));
    },
    searchUserByEmail: async (value: string, pagination: PaginationEvent) => {
      await dispatch(action.searchUserByEmail(value, pagination));
    },
    getAllUsers: (pagination: PaginationEvent) =>
      dispatch(action.getAllUsers(pagination))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)