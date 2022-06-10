import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

//async returns function with a dispatch 
//Takes data which was passed from the form (see components/Auth/auth.js)
export const signin = (formData, history) => async (dispatch) => {
  try {
    //login user...
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    //navigate to homepage
    history.push('/');
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    //signup user...
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    //navigate to homepage
    history.push('/');
  } catch (error) {
    console.log(error);
  }
}