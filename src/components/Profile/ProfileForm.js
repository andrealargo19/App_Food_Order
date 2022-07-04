import classes from './ProfileForm.module.css';
import {useRef, useContext } from 'react';
import React from 'react'
import AuthContext from '../../store/auth-context';



const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
      const enteredNewPassword = newPasswordInputRef.current.value;
        await fetch('https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/users/changePassword', 
        {
        method: 'PUT',
        body: JSON.stringify({
        data: {
          UserId: authCtx.userId,
          NewPassword: enteredNewPassword,          
        }
        }),
      headers: {
        'Content-Type': 'application/json',
      }
      }).then(res => {

      if (res.status === 200) {
        alert("Password changed!!");
        authCtx.logout();
      }
      })
  };

  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
