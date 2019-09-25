import React, { ChangeEvent } from 'react';
import { UserService } from '../../service/users.service';
import {setUserStatus, setUserRole} from './../../store/actions/authentificatedInfoAction';
import { connect } from 'react-redux';
import { UserInfoService } from '../../service/user-info.service';
import { User } from '../../models/user.model';
import ReactModal from 'react-modal';

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
  email: string;
  password: string;
  valid: boolean;
  authFailedModal: boolean;
}

class AuthFormLogin extends React.Component<any, State> {
  public userService: UserService;
  public userInfoService: UserInfoService;
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      valid: false,
      authFailedModal: false
    };

    this.userService = new UserService();
    this.userInfoService = new UserInfoService();

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.authFailedModalToggle = this.authFailedModalToggle.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement('.authLoginComponent')
  };

  public handleChange(event: ChangeEvent<HTMLInputElement>): void {
    switch (event.target.id) {
      case 'email':
        this.setState({
          ...this.state,
          email: event.target.value
        })
        this.isValid();
        break;
      case 'password':
        this.setState({
          ...this.state,
          password: event.target.value
        })
        this.isValid();
        break;
      default:
        console.log('target: ', event.target, 'value: ', event.target.value);
        break;
    }
  }
  
  public login(): void {
    this.userService.login((this.state as {email: string, password: string}))
    .then((res) => {
      if (res) {
        this.props.setUserStatus(true);
        this.props.setUserRole((this.userInfoService.getCurrentUser() as User).role);
        this.props.history.push({
          pathname: '/profile'
        });
      }
    })
    .catch(err => {
      this.authFailedModalToggle()
    })
  }

  public authFailedModalToggle(): void {
    this.setState({authFailedModal: !this.state.authFailedModal}) 
  }

  public isValid(): void {
    if (this.state.email.length > 2 && this.state.password.length > 2) {
      this.setState({
        valid: true
      })
    } else {
      this.setState({
        valid: false
      })
    }
  }

  render() {
    return (
      <div className="row authLoginComponent">
        <ReactModal
        isOpen={this.state.authFailedModal}
        style={customStyles}
        contentLabel="Authorization failed modal"
        >
          <p>Authorization failed.</p>
          <p>Please check your e-mail, password or keyboard language.</p>
          <button
            className="btn green darken-2"
            onClick={this.authFailedModalToggle}
          >Ok</button>
        </ReactModal>

        <div className="col s4 offset-s4">
          <div className="input-field ">
            <input type="text" id="email" 
            onChange={this.handleChange}
            />
            <label>E-mail</label>
          </div>
          <div className="input-field">
            <input type="password" id="password" 
            onChange={this.handleChange}
            />
            <label>Password</label>
          </div>
          <button type="button" className="btn waves-effect"
          onClick={this.login}
          disabled={!this.state.valid}
          >Log in</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    ...state.authentificatedInfoReducer
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserStatus: (status: boolean) => dispatch(setUserStatus(status)),
    setUserRole: (role: number) => dispatch(setUserRole(role))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormLogin)