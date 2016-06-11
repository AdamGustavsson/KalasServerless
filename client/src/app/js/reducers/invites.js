import { GET_INVITES_FOR_PARTY,CREATE_INVITE,GET_INVITE,ACCEPT_INVITE,REJECT_INVITE,LOGOUT_USER} from '../actions/constants';

const INITIAL_STATE = { all: [],invite: null};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_INVITES_FOR_PARTY:
      return { ...state, all: action.payload.data.invites_for_party };
    case CREATE_INVITE:
        return  {...state, all: [...state.all,action.payload.data.invite]};
    case GET_INVITE:
        return  {...state, invite: action.payload.data.invite};
    case ACCEPT_INVITE:
        return  {...state, invite: action.payload.data.invite};
    case REJECT_INVITE:
        return  {...state, invite: action.payload.data.invite};
    case LOGOUT_USER:
        return { ...state, INITIAL_STATE };
    default:
      return state;
  }
}
