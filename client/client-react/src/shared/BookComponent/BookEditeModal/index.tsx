import React from 'react';

interface props {
  show: boolean;
  onClose: () => void;
  title: string;
}

export class BookEditeFromFavModal extends React.Component<props> {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="mybackdrop">
        <div className="mymodal">
          <div className="container center">
            Edite book ?
            <br/>
            <b>{this.props.title}</b>
          </div>
          <div className="myfooter">
            <button className="btn green"
            onClick={(this.props as any).onClose}
            >
              Close
            </button>
            <button className="btn orange"
            
            >
              Edite
            </button>
          </div>
        </div>
      </div>
    );
  }
}