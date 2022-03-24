import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import MainNavigation from '../Layout/MainNavigation';
import React from 'react'
import ReactDOM from 'react-dom'


const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <MainNavigation />
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
