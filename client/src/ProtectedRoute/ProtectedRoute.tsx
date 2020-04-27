import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStoreState } from '../store/reducers';

export interface Props {
  component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  path,
  exact = false,
}: Props) => {
  const user = useSelector((state: IStoreState) => state.user.user);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props: RouteComponentProps) =>
        user ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default ProtectedRoute;
