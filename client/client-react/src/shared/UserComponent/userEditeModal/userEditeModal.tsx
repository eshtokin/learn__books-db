import React, { ChangeEvent } from 'react';
import { User } from '../../../models/user.model';
import './style.scss';

interface Props {
  user: User;
  addBtnStatus: boolean;
  okBtnStatus: boolean;
  close: () => void;
  editeUser: (user: User) => void;
  addNewUser: (user: User) => void;
}

interface State {
  user: User;
  confirmPassword: string;
  validStatus: boolean;
  addBtnDisabled: boolean;
}

export default class UserEditeModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      user: this.props.user || {},
      confirmPassword: '',
      validStatus: true,
      addBtnDisabled: true
    }
  }
  
  public userChangeHandler(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    switch(event.target.id) {
      case 'name':
        this.setState({
          user: {
            ...this.state.user,
            name: event.target.value
          }
        })
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
        });
        this.areEqual(event.target.value, this.state.user.password);
        break;
      default:
        console.log('id: ', event.target.id, 'value: ', event.target.value);
        break;
    }
  }

  public areEqual(value1: string, value2: string): void {
    if (value1 === value2) {
      this.setState({
        validStatus: true,
        addBtnDisabled: false
      })
    } else {
      this.setState({
        validStatus: false,
        addBtnDisabled: true
      })
    }
  }

  render() {
    return (
      <div className="container center">
        <div className="input-field">
          <input type="text" id="name"
            defaultValue={this.state.user.name}
            onChange={event => this.userChangeHandler(event)}
          />
          <label htmlFor="name" className={this.state.user.name ? 'active' : ""}>Name</label>
        </div>
        <div className="input-field">
          <input type="text" id="email"
            onChange={event => this.userChangeHandler(event)}
            defaultValue={this.state.user.email}
          />
          <label htmlFor="email" className={this.state.user.email ? 'active' : ""}>E-mail</label>
        </div>
        <div className="input-field">
          <input type="password" id="password"
          onChange={event => this.userChangeHandler(event)}
          />
          <label htmlFor="password">password</label>
        </div>
        <div className="input-field">
          <input type="password" id="confirmPassword"
          onChange={event => this.userChangeHandler(event)}
          />
          <label htmlFor="confirmPassword"
          >repeate password</label>
        </div>
        <div className="my-input-field">
            <label htmlFor="roles">Role</label>
            <select name="roles"
              defaultValue={'' + this.state.user.role}
              onChange={(event) => this.userChangeHandler(event)}
            >
              <option value={+2}>User</option>
              <option value={+1}>Admin</option>
            </select>
        </div>
        <div className="container center">
          <button type="button" 
          className={this.props.addBtnStatus ? "btn waves-effect green" : 'hidden'}
          onClick={() => {
            this.props.addNewUser(this.state.user);
            this.props.close();
          }}
          disabled={this.state.addBtnDisabled}
          >Add
          </button>
          <button type="button"
          className={this.props.okBtnStatus ? "btn waves-effect green" : 'hidden'}
          onClick={() => {
            this.props.editeUser(this.state.user);
            this.props.close();
          }}
          disabled={!this.state.validStatus}
          >Ok
          </button>
          <button className="btn blue-grey"
          onClick={this.props.close}
          >Close</button>
        </div>
      </div>
    )
  }
}