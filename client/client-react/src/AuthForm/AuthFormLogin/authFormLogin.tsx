import React, { ChangeEvent } from 'react';
import { UserService } from '../../service/users.service';
import * as actions from './../../store/actions/authentificatedInfoAction';
import { connect } from 'react-redux';
import { UserInfoService } from '../../service/user-info.service';
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
    this.props.login({email: this.state.email, password: this.state.password}, this.props)
  }

  public authFailedModalToggle(): void {
    this.props.toggleModalStatus(false)
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
        isOpen={this.props.modalStatus}
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
    ...state.authentificatedInfo
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleModalStatus: (flag: boolean) => {
      dispatch(actions.toggleModalStatus(flag))
    },
    login: (user: {email: string, password: string}, props: any) => {
      dispatch(actions.login(user, props))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormLogin)