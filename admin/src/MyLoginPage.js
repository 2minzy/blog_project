import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
    margin: 'auto',
    paddingTop: '300px',
  },
  input: {
    marginBottom: '1rem',
    height: '30px',
  },
  btn: {
    backgroundColor: '#219bcf',
    height: '40px',
    color: 'white',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
  },
});

const MyLoginPage = ({ theme }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const notify = useNotify();
  const submit = e => {
    e.preventDefault();
    login({ email, password }).catch(() => notify('Invalid email or password'));
  };

  return (
    <ThemeProvider theme={createMuiTheme(defaultTheme)}>
      <form onSubmit={submit} className={classes.form}>
        <h2 className={classes.title}>SIGN IN</h2>
        <input
          name='email'
          type='email'
          value={email}
          placeholder='EMAIL'
          onChange={e => setEmail(e.target.value)}
          className={classes.input}
        />
        <input
          name='password'
          type='password'
          value={password}
          placeholder='PASSWORD'
          onChange={e => setPassword(e.target.value)}
          className={classes.input}
        />
        <button className={classes.btn}>SIGN IN</button>
      </form>
      <Notification />
    </ThemeProvider>
  );
};

export default MyLoginPage;
