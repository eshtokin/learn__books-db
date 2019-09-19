import React, { ChangeEvent } from 'react';
import { UserService } from '../../service/users.service';

interface State {
  email: string;
  password: string;
  valid: boolean;
}

export class AuthFormLogin extends React.Component<any, State> {
  constructor(props: State) {
    super(props);

    this.state = {
      email: '',
      password: '',
      valid: false
    };
    this.userService = new UserService();
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

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
    .then(console.log);
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

  public userService: UserService;

  render() {
    return (
      <div className="row">
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