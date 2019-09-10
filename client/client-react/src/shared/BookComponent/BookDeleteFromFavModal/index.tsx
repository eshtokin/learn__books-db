import React from 'react';

interface props {
  show: boolean;
  onClose: () => void;
  title: string;
}

export class BookDeleteFromFavModal extends React.Component<props> {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="mybackdrop">
        <div className="mymodal">
          <div className="container center">
            Delete book from "My Favorites" ?
            <br/>
            <b>{this.props.title}</b>
          </div>
          <div className="myfooter">
            <button className="btn green"
            onClick={(this.props as any).onClose}
            >
              Cancel
            </button>
            <button className="btn red"
            
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}