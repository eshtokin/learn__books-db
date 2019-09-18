import React, { ChangeEvent } from 'react';
import { User } from '../../../models/user.model';
import './style.scss';

interface Props {
  user: User;
  close: () => void;
  editeUser: (user: User) => void;
}

interface State {
  user: User;
  confirmPassword: string;
  validStatus: boolean;
}

export default class EditeProfileModal extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      user: this.props.user,
      confirmPassword: '',
      validStatus: true
    }

    this.editeUser = this.editeUser.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
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
        validStatus: true
        
      })
    } else {
      this.setState({
        validStatus: false
      })
    }
  }

  public uploadFile(event: ChangeEvent<HTMLInputElement>): void {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      const userCopy: User = {
        ...this.state.user,
        image: reader.result as string
      };
      this.setState({ user: userCopy})
    };
    reader.readAsDataURL((input.files as FileList)[0]);
  }

  public editeUser() {
    this.props.editeUser(this.state.user);
    this.props.close();
  }
  render() {
    return (
      <div className="center">
        <div className="conteiner">
        <label className="preview-label" htmlFor="image" > 
          <div className="preview">
            Click for change image
            <input type="file" name="image" id="image" onChange={this.uploadFile}/>
            <img src={this.state.user.image as string || 'https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png'} alt="user avatar" id="preview" />
          </div>
        </label>
        <div className="input-field">
          <input id="name" type="text" 
          defaultValue={this.props.user.name}
          className='validate'
          onChange={event => this.userChangeHandler(event)}
          />
          <label  htmlFor="last_name" className={this.state.user.name ? "active" : ''}>Enter new name</label>
        </div>
        <div className="input-field">
          <input id="email" type="text" 
          className="validate"
          defaultValue={this.props.user.email} 
          onChange={event => this.userChangeHandler(event)}
          />
          <label  htmlFor="last_name" className={this.state.user.email ? 'active' : ''}>Enter new e-mail</label>
        </div>
        <div className="input-field">
          <input id="password" type="text" 
          className="validate"
          onChange={event => this.userChangeHandler(event)}
          />
          <label  htmlFor="last_name">Enter new password</label>
        </div>
        <div className="input-field">
          <input id="confirmPassword" type="text" 
          className="validate"
          onChange={event => this.userChangeHandler(event)}
          />
          <label  htmlFor="last_name">Repeate new password</label>
        </div>
        </div>
        <button className="btn grey darken-2"
          onClick={this.props.close}
        >
          Close
        </button>
        <button className="btn green"
        onClick={this.editeUser}
        >
          Save
        </button>
      </div>
    )
  }
}