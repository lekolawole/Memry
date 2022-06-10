import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script'
import { useHistory } from 'react-router-dom';
import { AUTH } from '../../constants/actionTypes';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';

import Input from './Input';
import Icon from './icon';

import useStyles from './styles';

const initialState = { 
  firstName: '', 
  lastName: '', 
  email: '',
  password: '', 
  confirmPassword: ''
}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  //Dynamic, used for multiple field inputs for Sign-In/Sign-Up Form
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    function start() {
      gapi.auth2.init({client_id: '87124810734-5jall375t559o33tlsg4nv0hv4eh2rem.apps.googleusercontent.com'})
    }
    gapi.load('client:auth2', start)
  })

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword); //toggles previous state of showPassword

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignup) {
      dispatch(signup(formData, history)) //pass formData & history to navigate once user signs up
    } else {
      dispatch(signin(formData, history))
    }
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
   const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try again later.")
  }

  //const isSignup = true; //Will display authentication if user is defined, or Form is user is undefined
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography varaiant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half></Input>
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half></Input>
                </>
              )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin 
            clientId="87124810734-5jall375t559o33tlsg4nv0hv4eh2rem.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} 
                variant="contained">
                  Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
              />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Container>
    );
}

export default Auth;