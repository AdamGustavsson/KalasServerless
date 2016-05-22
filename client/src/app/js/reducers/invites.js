import { GET_INVITES_FOR_PARTY} from '../actions/constants';

const INITIAL_STATE = { all: []};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_INVITES_FOR_PARTY:
      return { ...state, all: action.payload.data.invites_for_party };
    default:
      return state;
  }
}
