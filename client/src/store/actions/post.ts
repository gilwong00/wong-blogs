import { DispatchResult, ActionResult, NonAsyncAction } from '.';
import axios from 'axios';
import { IUser } from './user';

export enum POST_ACTIONS {
  FETCH_POSTS = 'FETCH_POSTS',
  REMOVE_POST = 'REMOVE_POST',
  FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS',
  ADD_POST = 'ADD_POST',
}

export interface IPost {
  id?: number;
  title?: string;
  body?: string;
  user_id?: number;
  author?: string;
  date_created?: Date;
  totalComments?: number;
}

export type PostActions = { type: string; payload: Array<IPost> };

export const fetchPosts = (): ActionResult => async (
  dispatch: DispatchResult
) => {
  try {
    const { data } = await axios.get<Array<IPost>>('/api/posts');

    dispatch({
      type: POST_ACTIONS.FETCH_POSTS,
      payload: data,
    });
  } catch (err) {
    throw err;
  }
};

export const fetchUserPosts = (userId: number): ActionResult => async (
  dispatch: DispatchResult
) => {
  try {
    const { data } = await axios.get<Array<IPost>>(`/api/posts/${userId}`);

    dispatch({
      type: POST_ACTIONS.FETCH_POSTS,
      payload: data,
    });
  } catch (err) {
    throw err;
  }
};

export const removePost = (id: number): ActionResult => async (
  dispatch: DispatchResult,
  getState
): Promise<void> => {
  try {
    const currentPost: Array<IPost> = getState().posts.posts;

    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: POST_ACTIONS.REMOVE_POST,
      payload: currentPost.filter((post) => post.id !== id),
    });
  } catch (err) {
    throw err;
  }
};

export const fetchPostComments = () => {
  return {
    type: POST_ACTIONS.FETCH_POST_COMMENTS,
  };
};

export const addNewPost = (newPost: IPost): ActionResult => async (
  dispatch: DispatchResult,
  getState
): Promise<void> => {
  try {
    const currentPost: Array<IPost> = getState().posts.posts;
    const user: IUser = getState().user.user;

    const { data } = await axios.post<IPost>('/api/posts', {
      ...newPost,
      userId: user.id,
      username: user.username,
    });

    dispatch({
      type: POST_ACTIONS.ADD_POST,
      payload: [data, ...currentPost],
    });
  } catch (err) {
    throw err;
  }
};

