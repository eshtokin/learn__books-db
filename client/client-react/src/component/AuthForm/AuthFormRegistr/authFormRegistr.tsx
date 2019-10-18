import React, { ChangeEvent } from 'react';
import UserService, { UserServiceClass } from '../../../service/users.service';
import { User } from '../../../models/user.model';
import { connect } from 'react-redux';
import * as actions from './../../../store/actions/authentificatedInfoAction';
import { Store } from '../../../store/store';

interface Props {
  registrate: (user: User) => void
}

interface State {
  user: User;
  confirmPassword: string;
  valid: boolean;
}

class AuthFormRegistr extends React.Component<Props, State> {
  public userService: UserServiceClass;

  constructor(props: Props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: '',
        name: '',
        role: 2,
        books: [],
        image: '',
        _id: ''
      },
      confirmPassword: "",
      valid: false
    };

    this.userService = UserService;

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.registrate = this.registrate.bind(this);
  }

  public onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    switch(event.target.id) {
        case 'name':
            this.setState({
              user: {
                ...this.state.user,
                name: event.target.value
              }
            });
            break;
        case 'email':
            this.setState({
              user: {
                ...this.state.user,
                email: event.target.value
              }
            })
            break;
        case 'password':
            this.setState({
              user: {
                ...this.state.user,
                password: event.target.value
              }
            });
            this.areEqual(event.target.value, this.state.confirmPassword);
            break;
        case 'confirmPassword':
            this.setState({
              confirmPassword: event.target.value
            })
            this.areEqual(event.target.value, this.state.user.password);            
            break;
        default: break;
    };
  }

  public areEqual(value1: string, value2: string): void {
    this.setState({
      valid: (value1 === value2 && value1.length > 3 && value2.length > 3)
    })
  }

  public registrate(): void {
    this.props.registrate(this.state.user)
  }

  render() {
    return (
      <div className="row">
        <div className="col s4 offset-s4">
          <div className="input-field">
            <input type="text" id="name"
            onChange={event => this.onChangeHandler(event)}
            />
              <label>Name</label>
            </div>
            <div className="input-field">
              <input type="text" id="email"
              value={this.state.user.email}
              onChange={event => this.onChangeHandler(event)}
              />
              <label>E-mail</label>
            </div>
            <div className="input-field">
              <input type="password" id="password"
               onChange={event => this.onChangeHandler(event)}
              />
              <label>Password</label>
            </div>
            <div className="input-field">
              <input
              onChange={event => this.onChangeHandler(event)}
              type="password" id="confirmPassword"
              />
              <label >Confirm Password</label>
            </div>
            <button type="button"
            className="btn waves-effect"
            onClick={this.registrate}
            disabled={!this.state.valid}
            >Registrate</button>
          </div>
        </div>
    )
  } 
}

const mapStateToProps = (state: Store) => {
  return {
    store: {...state.authentificatedInfo}
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    registrate: (user: User) => {
      dispatch(actions.registrate(user))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormRegistr)