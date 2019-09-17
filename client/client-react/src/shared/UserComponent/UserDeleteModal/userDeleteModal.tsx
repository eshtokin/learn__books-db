import React from 'react';
import './style.scss'
import { User } from '../../../models/user.model';

interface Props {
  user: User;
  close: () => void;
  deleteUser: (user: User) => void;
}

export default function DeleteUserModal(props: Props) {
  return (
    <div className="container center">
      <p>Delete user with email: {props.user.email} ?</p>
      <br/>
      <button
      className="btn green"
      onClick={props.close}
      >Close
      </button>
      <button 
        className="btn red"
        onClick={() => {
          props.close();
          props.deleteUser(props.user)
        }}
        >
        Delete
      </button>
    </div>
  )
}