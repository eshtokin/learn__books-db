import * as micromodalConstant from '../constants/micromodalConstant';
import MicroModal from 'micromodal';

export interface ErrorState {
  error: {status: number, message: string},
}

interface Action {
  type: string;
  payload: any;
}

export enum isVisible {
  hidden = 0,
  visible = 1
}

export function error(state: ErrorState = {error: {status: 0, message: ""}}, action: Action): ErrorState {
  switch(action.type) {
    case micromodalConstant.SAVE_ERROR:
      MicroModal.show('modal-1');
      return {
        ...state,
        error: action.payload
      }
    case micromodalConstant.DELETE_ERROR:
        MicroModal.close('modal-1');
        return {
          ...state,
          error: action.payload
        }
    default:
      return state;
  }
}