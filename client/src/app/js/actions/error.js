import { ERROR,RESET_ERROR } from './constants';

export function resetError() {
  return {
    type: RESET_ERROR
  }
}

export function throwError(message) {
  return {
    type: ERROR,
    payload: message
  }
}
