import { combineReducers } from 'redux';
import user, { IUserState } from './user';
import posts, { IPostState } from './posts';

export interface IStoreState {
  user: IUserState;
  posts: IPostState;
}

export default combineReducers({
  user,
  posts,
});
