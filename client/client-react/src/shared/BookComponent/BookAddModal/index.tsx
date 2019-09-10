import React from 'react';

interface props {
  show: boolean;
  onClose: () => void;
}

export class BookAddModal extends React.Component<props> {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="mybackdrop">
        <div className="mymodal">
          <div className="container center">
            <h3>Book successfully added</h3>
          </div>
          <div className="myfooter">
            <button
            className="btn green"
            onClick={(this.props as any).onClose}
            >OK</button>
          </div>
        </div>
      </div>
    );
  }
}