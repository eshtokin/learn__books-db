import React from 'react';
import UserService from '../../service/user.service';

class AuthFormlogin extends React.Component<{}, {email?: string, password?: string}> {
  constructor(props: object) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    let data;
    switch (event.target.id) {
      case 'email': 
        data = {email: event.target.value};
        break;
      case 'password':
        data = {password: event.target.value};
        break;
      default:
        data = {email: '', password: ''};
        break;
    };
    this.setState(data);
  }

  buttonHandler() {
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    UserService.login(user);
  }

  render() {
    return (
      <div className="row">
        <div className="col s4 offset-s4">
          <div className="input-field ">
            <input 
              type="text" 
              id="email" 
              onChange={this.handleInput}
           />
            <label htmlFor="email">E-mail</label>
          </div>
          <div className="input-field">
            <input 
              type="password" 
              id="password" 
              onChange={this.handleInput} 
            />
            <label htmlFor="password">Password</label>
          </div>
          <button 
            type="button" 
            className="btn waves-effect"
            onClick={this.buttonHandler}
          >Log in</button>
        </div>
      </div>
    )
  }
}

export default AuthFormlogin;