import { useState } from 'react';
import classes from './AuthForm.module.css';
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleUser} from '@fortawesome/free-solid-svg-icons';
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  return (
    <section className={classes.auth}>
      <FontAwesomeIcon icon={faCircleUser}/>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
      <div className={classes.control}>
          <label htmlFor='userName'></label>
          <input type='text' id='firstName' placeholder='Enter your firstName...' required />
          <FontAwesomeIcon icon={faCircleUser}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='userName'></label>
          <input type='text' id='lastName' placeholder='Enter your lastName...' required />
          <FontAwesomeIcon icon={faCircleUser}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='userName'></label>
          <input type='text' id='userName' placeholder=' Enter your userName...' required />
          <FontAwesomeIcon icon={faCircleUser}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'></label>
          <input type='password' id='password' placeholder='Enter your password...' required />
          <FontAwesomeIcon icon={faUnlockKeyhole}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}
          </button>
        </div>
        <div className={classes.actions_toggle}>
        <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;