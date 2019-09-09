import React, { Props, ChangeEvent } from 'react';
import { UserService } from './../../service/users.service';

export class AuthFormLogin extends React.Component {
  constructor(props: Props<any>) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    this.userService = new UserService();
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  public handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.id === 'email') {
      this.setState({
        ...this.state,
        email: event.target.value
      })
    }
    if (event.target.id === 'password') {
      this.setState({
        ...this.state,
        password: event.target.value
      })
    }
  }
  
  public login(): void {
    this.userService.login((this.state as {email: string, password: string}))
    .then(console.log);
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
          >Log in</button>
        </div>
      </div>
    )
  }
}