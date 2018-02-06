import { PAY_FOR_THEME } from '../actions/constants';

const INITIAL_STATE = { isThemePaidFor: localStorage.getItem("isThemePaidFor")  };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case PAY_FOR_THEME:
      return { ...state, isThemePaidFor: true };
    default:
      return state;
  }
}
