import React from 'react';
import { User } from "../../models/user.model";
import ReactModal from 'react-modal';
import { Book } from '../../models/book.model';
import UserEditeModal from './userEditeModal/userEditeModal';
import './style.scss';
import DeleteUserModal from './UserDeleteModal/userDeleteModal';

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
  userDeleteModal: boolean;
  userEditeModal: boolean;
}
interface Props {
  user: User;
  deleteUser: (user: User) => void;
  editeUser: (user: User) => void;
}

export class UserComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      userDeleteModal: false,
      userEditeModal: false
    };

    this.userDeleteModal = this.userDeleteModal.bind(this);
    this.userEditeModal = this.userEditeModal.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement('.userComponent')
  }

  public userDeleteModal() {
    this.setState({
      userDeleteModal: !this.state.userDeleteModal
    })
  }

  public userEditeModal() {
    this.setState({
      userEditeModal: !this.state.userEditeModal
    })
  }
  
  render() {
    return (
      <div className="z-depth-4 userComponent">
        <ReactModal
        isOpen={this.state.userDeleteModal as boolean}
        style={customStyles}
        contentLabel="User delete modal"
        >
          <DeleteUserModal 
            user={this.props.user}
            close={this.userDeleteModal}
            deleteUser={this.props.deleteUser}
          />
        </ReactModal>

        <ReactModal
        isOpen={this.state.userEditeModal as boolean}
        style={customStyles}
        contentLabel="User edite modal"
        >
          <UserEditeModal 
            user={this.props.user}
            addBtnStatus={false}
            okBtnStatus={true}
            close={this.userEditeModal}
            editeUser={this.props.editeUser}
            addNewUser={() => {}}
          />
        </ReactModal>

        <div className="card horizontal z-depth-4">
          <div className="card-image col s4">
          <img src={this.props.user.image as string || 'https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png'} className="user-image" alt="userImage" />
            <button 
            className="btn edite-btn rework-btn"
            onClick={this.userEditeModal}>
              <i className="material-icons">edite</i>
            </button>
            <button 
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
              <ol className="listOfBook"> 
                <span><b>List of books:</b></span>
                {(this.props.user.book_list as Book[]).map((book, index) => {
                  return <li key={index}>
                    {book.title}
                  </li>
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}