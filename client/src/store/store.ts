import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer, { IStoreState } from './reducers';
import { AnyAction } from 'redux'; // replace this
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<IStoreState, AnyAction>)
  )
);

export default store;
