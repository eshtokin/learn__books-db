import React from "react";
import './errorModal.css';
import { Store } from "../../store/store";
import { connect } from "react-redux";
import * as actions from '../../store/actions/micromodalAction';

function ErrorModalComponent(props: any) {
  const {message} = props.store.error;
  return (
    <div className="modal micromodal-slide" id="modal-1" aria-hidden="true">
      <div className="modal__overlay" tabIndex={-1} data-micromodal-close>
        <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
          <header className="modal__header">
            <h2 className="modal__title" id="modal-1-title">
              Error
            </h2>
            <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
          </header>
          <main className="modal__content" id="modal-1-content">
            <p>{message}</p> 
          </main>
          <footer className="modal__footer">
            {/* <button className="modal__btn modal__btn-primary">Continue</button> data-micromodal-close */}
            <button className="modal__btn" 
            aria-label="Close this dialog window"
            onClick={props.deleteError}
            >Close</button>
          </footer>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: Store) => {
  return {
    store: {...state.error}
  }
};


const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteError: () => {
      dispatch(actions.deleteError())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModalComponent)