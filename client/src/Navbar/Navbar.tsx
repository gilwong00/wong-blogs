import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { IStoreState } from '../store/reducers';
import { logout } from '../store/actions/user';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const user = useSelector((state: IStoreState) => state.user.user);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Blogs
          </Typography>
          {user ? (
            <>
              <Button color='inherit' onClick={() => history.push('/mypost')}>
                My Posts
              </Button>
              <Button color='inherit' onClick={() => dispatch(logout())}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button color='inherit' onClick={() => history.push('/login')}>
                Login
              </Button>
              <Button color='inherit' onClick={() => history.push('/register')}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
