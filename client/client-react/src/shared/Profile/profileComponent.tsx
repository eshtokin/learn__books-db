import React from 'react';
import UserService, { UserServiceClass } from '../../service/users.service';
import UserInfoService, { UserInfo } from '../../service/user-info.service';
import { User } from '../../models/user.model';
import './style.scss';
import { Book } from '../../models/book.model';
import ReactModal from 'react-modal';
import EditeProfileModal from './editeProfileModal/editeProfileModal';
import { History } from 'history';

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
  history: History;
}

interface State {
  user: User;
  books: Book[];
  editeProfileModal: boolean;
}

export default class Profile extends React.Component<Props, State> {
  public userService: UserServiceClass;
  public userInfoService: UserInfo;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        name: '',
        email: '',
        role: 2,
        password: '',
        _id: '',
        image: ''
      },
      books: [],
      editeProfileModal: false
    }
    this.userService = UserService;
    this.userInfoService = UserInfoService;

    this.editeProfileModal = this.editeProfileModal.bind(this);
    this.editeUser = this.editeUser.bind(this);
  }
  
  componentDidMount() {
    ReactModal.setAppElement('.profileComponent');
    const user = this.userInfoService.getCurrentUser() as User;
    this.userService.getUser(user ? user.id as string : '')
    .then((user: User) => {
      if (user && (user.books as string[]).length > 0) {
        this.userService.getUserBooks(user.books as string[], {pageIndex: 0, pageSize: 6, length: 0})
        .then(data => {
          this.setState({
            books: data[0].listOfItem as Book[]
          })
        });
        this.setState({user});
      } else {
        this.props.history.push({
          pathname: '/'
        })
      }
    })
  }

  public editeProfileModal(): void {
    this.setState({
      editeProfileModal: !this.state.editeProfileModal
    })
  }

  public editeUser(user: User) {
    this.userService.edit((user._id as string), user)
    .then(() => {
      this.componentDidMount()
    })
  }

  render() {
    return (
      <div className="container profileComponent">
        <ReactModal
        isOpen={this.state.editeProfileModal}
        style={customStyles}
        contentLabel="Edite book modal">
          <EditeProfileModal
          user={this.state.user}
          close={this.editeProfileModal}
          editeUser={this.editeUser}
          />
        </ReactModal>
        <div className="header">
          <div className="icon"><i className="fa fa-ellipsis-h"></i></div>
          <div className="icon"><i className="fa fa-plus"></i></div>
          <i className="material-icons edite-profile-btn"
          onClick={this.editeProfileModal}
          >edite</i>
        </div>
        <div className="content">
          <img className="face"
            src={this.state.user.image as string}
            alt='user avatar'
          />
          <div className="name">{this.state.user.name}</div>
          <div className="email">{this.state.user.email}</div>
          {/* <div className="social">
            <div className="text"><span><i className="material-icons">instagram</i></span>3.5k</div>
            <div className="text"><span><i className="material-icons"></i></span>11k</div>
            <div className="text"><span><i className="material-icons"></i></span>155</div>
            <div className="text"><span><i className="material-icons"></i></span>2.7k</div>
          </div> */}
        </div>
        {/* <div class="photo-section">
          <div class="photo-title">
            <div class="title"><a href="#">All</a></div>
            <div class="title"><a href="#">Photos</a></div>
            <div class="title"><a href="#">Music</a></div>
            <div class="title"><a href="#">Videos</a></div>
          </div> */}
        <div className="thumb-wrapper">
          { this.state.books 
            ? this.state.books.map((book, index) => {
              return (
                <img src={book.image as string}
                alt="Book"
                className="thumb-unit"
                key={index}/>
              )
            })
            : null
          }
        </div>
      {/* <div className="footer"><i className="fa fa-camera"></i><i className="fa fa-play"></i>
        <div className="face"></div>
        <i className="fa fa-globe"></i>
      </div> */}
        </div>
    )
  }
}