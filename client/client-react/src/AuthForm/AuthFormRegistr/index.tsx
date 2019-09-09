import React, { Props, ChangeEvent } from 'react';

export class AuthFormRegistr extends React.Component {
  constructor(props: Props<any>) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      valid: false
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.checkPass = this.checkPass.bind(this);
    this.registrate = this.registrate.bind(this);
  }

  public onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    switch(event.target.id) {
        case 'name':
            this.setState({
                ...this.state,
                name: event.target.value
            });
            break;
        case 'email':
            this.setState({
                ...this.state,
                email: event.target.value
            })
            break;
        case 'password':
            this.setState({
                ...this.state,
                password: event.target.value
            });
            this.checkPass();
            break;
        case 'confirmPassword':
            this.setState({
                ...this.state,
                confirmPassword: event.target.value
            })
            setTimeout(this.checkPass, 20)
            break;
        default: break;
    };
  }

  public checkPass() {
    console.log(this.state);
    if ((this.state as any).password.length > 0 && (this.state as any).confirmPassword.length > 0) {
        if ((this.state as any).password === (this.state as any).confirmPassword) {
            this.setState({
                ...this.state,
                valid: true
            })
        } else {
            this.setState({
                ...this.state,
                valid: false
            })
        }
    }
  }

  public registrate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="row">
        <div className="col s4 offset-s4">
          <div className="input-field">
            <input type="text" id="name"
            onChange={this.onChangeHandler}
            />
              <label>Name</label>
            </div>
            <div className="input-field">
              <input type="text" id="email"
              value={(this.state as any).email}
              onChange={this.onChangeHandler}
              />
              <label>E-mail</label>
            </div>
            <div className="input-field">
              <input type="password" id="password"
              onChange={this.onChangeHandler}
              // (ngModelChange)="checkPass()"
              />
              <label>Password</label>
            </div>
            <div className="input-field">
              <input 
              // (ngModelChange)="checkPass()"
              onChange={this.onChangeHandler}
              type="password" id="confirmPassword"
              />
              <label >Confirm Password</label>
            </div>
            <button type="button"
            className="btn waves-effect"
            onClick={this.registrate}
            // disabled={!(this.state as any).valid}
            >Registrate</button>
          </div>
        </div>
    )
  }
  
}