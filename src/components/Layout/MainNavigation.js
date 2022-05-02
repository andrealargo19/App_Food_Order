import { useContext } from 'react';
import { Link } from 'react-router-dom';
import React from 'react'
import classes from './MainNavigation.module.css';
import logo from '../../assets/logo1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; 
import AuthContext from '../../store/auth-context';



const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  }
  
  return (
    <header className={classes.header}>
      {isLoggedIn && (
        <Link to='/'>
          <div className={classes.logo}>
            <img className={classes.main_logo} src={logo} alt="es un logo"/>
          </div>
        </Link>
        )}
      <nav>
        <ul>
          {!isLoggedIn && ( 
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
         {isLoggedIn && (
          <button onClick={logoutHandler} className={classes.button_header}>
            <FontAwesomeIcon icon={faRightFromBracket}/>
            Logout
          </button> 
        )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;