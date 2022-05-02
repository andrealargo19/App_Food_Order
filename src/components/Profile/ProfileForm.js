import classes from './ProfileForm.module.css';
// import {useRef, useContext } from 'react';
import React from 'react'
// import AuthContext from '../../store/auth-context';




const ProfileForm = () => {
  // const newPasswordInputRef = useRef();
  // const authCtx = useContext(AuthContext);

  // const submitHandler = (event) => {
  //   event.preventDefault();

  //   const enteredNewPassword = newPasswordInputRef.current.value; pasar este valor en el return.

  //   fetch('', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       data: {
  //         idToken: authCtx.token,
  //         password: enteredNewPassword,
  //         returnSecureToken: false
  //       }
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   }). then(res => {

  //   })
  // };
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
