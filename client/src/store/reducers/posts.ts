import { POST_ACTIONS, PostActions, IPost } from '../actions/post';

export interface IPostState {
  posts: Array<IPost>;
}

const INITIAL_STATE = {
  posts: [],
};

export default (state = INITIAL_STATE, action: PostActions): IPostState => {
  switch (action.type) {
    case POST_ACTIONS.FETCH_POSTS:
      return { ...state, posts: action.payload };
    case POST_ACTIONS.ADD_POST:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};
