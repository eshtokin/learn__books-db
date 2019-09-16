import React from 'react';
import './style.scss'

interface props {
  show: boolean;
  onClose: () => void;
  userEmail: string;
}

export class UserDeleteModal extends React.Component<props> {

  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="mybackdrop">
        <div className="mymodal">
        <h3>Delete user?</h3>
          <p>Delete user with e-mail: <b>{this.props.userEmail}</b></p>
          
          <div className="myfooter">
            <button className="btn green"
              onClick={(this.props as any).onClose}
            >
              Cancel
            </button>
            <button className="btn red">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}