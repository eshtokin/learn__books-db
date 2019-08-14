import React from 'react';
import UserService from '../../service/user.service';
 
class AuthFormReg extends React.Component<{}, {email?: string, password?: string, name?: string}> {
  constructor(props: object) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this)
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
      case 'name':
        data = {name: event.target.value};
        break;
      default:
        data = {};
    }
    this.setState(data)
  }

  buttonHandler() {
    const user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };
    UserService.registrate(user);
    // Axios.post('http://localhost:3000/registration', this.state)
    //   .then(res => {
    //     console.log(res)
    //       return res;
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="row">
        <div className="col s4 offset-s4">
          <div className="input-field">
            <input type="text" id="email" onChange={this.handleInput.bind(this)} />
            <label htmlFor="email">E-mail</label>
          </div>
          <div className="input-field">
            <input type="password" id="password" onChange={this.handleInput}/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field">
            <input type="text" id="name" onChange={this.handleInput}/>
            <label htmlFor="name">Name</label>
          </div>
          <button 
            type="button" 
            className="btn waves-effect" 
            onClick={this.buttonHandler}      
          >Registrate</button>
        </div>
      </div>
    )
  }
}

export default AuthFormReg;