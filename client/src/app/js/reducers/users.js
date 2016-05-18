import { GET_USERS, GET_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER} from '../actions/constants';

const INITIAL_STATE = { all: [], user: null, currentUser: JSON.parse(localStorage.getItem("currentUser")) };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_USERS:
      return { ...state, all: action.payload.data.users };
    case GET_USER:
      return { ...state, user: action.payload.data.user };
    case LOGIN_USER:
      localStorage.setItem("currentUser", JSON.stringify(action.payload.data.user));    
      return { ...state, currentUser: action.payload.data.user };
    case UPDATE_USER:
      localStorage.setItem("currentUser", JSON.stringify(action.payload.data.user));  
      return { ...state, currentUser: action.payload.data.user };
    case LOGOUT_USER:
      localStorage.setItem("currentUser", null);
      return { ...state, currentUser: null };
    default:
      return state;
  }
}
