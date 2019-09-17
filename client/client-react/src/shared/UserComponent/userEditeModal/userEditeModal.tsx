import React from 'react';
import { User } from '../../../models/user.model';
import './style.scss';

interface Props {
  user: User;
  close: () => void;
  editeUser: (user: User) => void;
  addNewUser: (user: User) => void;
}

export default function UserEditeModal(props: Props) {
  const user = {...props.user};
  let confirmPassword = user.password;
  
  return (
    <div className="container center">
      <div className="input-field">
        <input type="text" id="name"
          defaultValue={user.name}
          onChange={event => user.name = event.target.value}
        />
        <label htmlFor="name">Name</label>
      </div>
      <div className="input-field">
        <input type="text" id="email"
          defaultValue={user.email}
          onChange={event => user.email = event.target.value}
        />
        <label htmlFor="email">E-mail</label>
      </div>
      <div className="input-field">
        <input type="password" id="password"
          onChange={event => user.password = event.target.value}
        />
        <label htmlFor="password">password</label>
      </div>
      <div className="input-field">
        <input type="password" id="confirmPassword"
          onChange={event => confirmPassword = event.target.value}/>
        <label htmlFor="confirmPassword"
        >repeate password</label>
      </div>
      <div className="my-input-field">
          <label htmlFor="roles">Role</label>
          <select name="roles"
            defaultValue={'' + user.role}
            onChange={(event) => user.role = +event.target.value}
          >
            <option value={+2}>User</option>
            <option value={+1}>Admin</option>
          </select>
      </div>
      <div className="container center">
        <button type="button" className="btn waves-effect green"
        onClick={() => props.addNewUser(user)}
        >Add
        </button>
        <button type="button" className="btn waves-effect green"
        onClick={() => props.editeUser(user)}
        >Ok
        </button>
        <button className="btn blue-grey"
        onClick={props.close}
        >Close</button>
      </div>
    </div>
  )
}