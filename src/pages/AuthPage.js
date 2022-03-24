import AuthForm from '../components/Auth/AuthForm';
import MainNavigation from '../components/Layout/MainNavigation'
import { Fragment } from 'react';
import React from 'react'
import ReactDOM from 'react-dom'

const AuthPage = () => {
  return(
    <Fragment>
      <MainNavigation />
      <AuthForm />
    </Fragment>
  
  );
};

export default AuthPage;
