import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { IStoreState } from '../reducers';

export type ActionResult = ThunkAction<Promise<void>, IStoreState, undefined, AnyAction>
export type NonAsyncAction = ThunkAction<void, IStoreState, undefined, AnyAction>;
export type DispatchResult = ThunkDispatch<{}, {}, AnyAction>
