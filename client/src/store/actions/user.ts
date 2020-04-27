import { DispatchResult, ActionResult, NonAsyncAction } from '.';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
axios.defaults.withCredentials = true;

export enum USER_ACTIONS {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  ADD_NEW_USER = 'ADD_NEW_USER',
}

export interface IUser {
  id?: number;
  username: string;
  email?: string;
  password?: string;
}

type Login = { type: string; payload: IUser };
type Logout = { type: string; payload: null };

export type UserActions = Login | Logout;

export const login = (user: IUser): ActionResult => async (
  dispatch: DispatchResult
): Promise<void> => {
  try {
    const { data } = await axios.post<IUser>('/api/user/login', user);
    dispatch({ type: USER_ACTIONS.LOGIN_SUCCESS, payload: data });
  } catch (err) {
    throw err;
  }
};

export const register = (user: IUser): ActionResult => async (
  dispatch: DispatchResult
): Promise<void> => {
  try {
    const { data } = await axios.post<IUser>('/api/user', user);
    dispatch({ type: USER_ACTIONS.LOGIN_SUCCESS, payload: data });
  } catch (err) {
    throw err;
  }
};

export const logout = (): NonAsyncAction => async (
  dispatch: DispatchResult
): Promise<void> => {
  dispatch({ type: USER_ACTIONS.LOGOUT, payload: null });
};

export const fetchUser = () => async (
  dispatch: DispatchResult
): Promise<void> => {
  try {
    const token = cookies.get('token');
    if (token) {
      const { data } = await axios.get('/api/user');
      dispatch({ type: USER_ACTIONS.LOGIN_SUCCESS, payload: data });
    }
  } catch (err) {
    throw err;
  }
};
