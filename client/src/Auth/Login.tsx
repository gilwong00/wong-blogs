import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { login } from '../store/actions/user';

const FormContainer = styled(Container)`
  width: 800px;
  margin-top: 5%;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: 20,
    paddingBottom: 20,
    width: '60%',
  },
}));

const Login = () => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();

      if (!username || !password) {
        throw new Error('Please enter all required fields');
      }

      await dispatch(login({ username, password }));
      return history.push('/');
    } catch (err) {
      // set some error state
      setError(err);
    }
  };
  return (
    <FormContainer>
      <Card>
        <CardContent>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              className={classes.textField}
              required
              label='Username'
              fullWidth
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
            />
            <TextField
              className={classes.textField}
              required
              label='Password'
              type='password'
              fullWidth
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </form>
          <div style={{ textAlign: 'center' }}>
            <Button variant='contained' color='primary' onClick={handleSubmit}>
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </FormContainer>
  );
};

export default Login;
