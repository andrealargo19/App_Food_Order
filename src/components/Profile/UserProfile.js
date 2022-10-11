import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import MainNavigation from '../Layout/MainNavigation';
import React from 'react'


const UserProfile = () => {
  return (
      <section className={classes.profile}>
          <MainNavigation />
            <h1>Perfil de usuario</h1>
          <ProfileForm />
          
      </section>
  );
};

export default UserProfile;
