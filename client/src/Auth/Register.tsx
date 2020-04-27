import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { register } from '../store/actions/user';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

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

const Register = () => {
  const [username, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();

      if (!username || !password || !email) {
        throw new Error('Please enter all required fields');
      }
    } catch (err) {}

		await dispatch(register({ username, password, email }));
		history.push('/login');
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
              label='Emal Address'
              type='email'
              fullWidth
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
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
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </FormContainer>
  );
};

export default Register;
