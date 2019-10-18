import * as micromodalConstant from './../constants/micromodalConstant';

interface ErrorBody {
  status: number;
  message: string;
}

export const saveError = (error: ErrorBody) => {
  return {
    type: micromodalConstant.SAVE_ERROR,
    payload: error
  }
}

export const deleteError = (error = {status: 0, message: ''}) => {
  return {
    type: micromodalConstant.DELETE_ERROR,
    payload: error
  }
}