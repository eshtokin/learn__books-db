import React from 'react';
import Axios from 'axios';
// import UserService from '../../service/user.service';
import { UserForLoginReg } from '../../models/user.model';

class AuthFormlogin extends React.Component<{}, {user: UserForLoginReg}> {
  constructor(props: object) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      }
    };

    this.handleInput = this.handleInput.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    let data;
    switch (event.target.id) {
      case 'email': 
        data = {user: {email: event.target.value}};
        break;
      case 'password':
        data = {user: {password: event.target.value}};
        break;
      default:
        data = {user: {email: '', password: ''}};
    }
    this.setState(data)
  }

  buttonHandler() {
    console.log(this.state)
    Axios.post('http://localhost:3000/login', this.state)
      .then(res => {
        console.log(res)
          return res;
      })
      .catch(err => console.log(err));
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