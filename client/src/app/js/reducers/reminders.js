import { CREATE_REMINDER} from '../actions/constants';


const INITIAL_STATE = {reminderCreated:false};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CREATE_REMINDER:
      return { ...state, reminderCreated: true };
    default:
      return state;
  }
}
