import { Link } from 'react-router-dom';
import React from 'react'
import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleUser} from '@fortawesome/free-solid-svg-icons';



const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>
        <img className={classes.main_logo} src={logo} alt="es un logo"/>
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/auth'>
            <FontAwesomeIcon icon={faCircleUser}/>
            <span>Login</span>
            </Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;