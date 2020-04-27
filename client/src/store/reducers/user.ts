import { USER_ACTIONS, UserActions } from '../actions/user';

export interface IUserState {
	user: any | null;
	isAuthenticated: boolean
}

const INITIAL_STATE = {
	user: null,
	isAuthenticated: false
};

export default (state = INITIAL_STATE, action: UserActions): IUserState => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN_SUCCESS:
			return { ...state, user: action.payload, isAuthenticated: true };
		case USER_ACTIONS.LOGOUT:
			return { ...state, user: action.payload };
    default:
      return state;
  }
};
