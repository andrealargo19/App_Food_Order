import { Fragment } from 'react';
import logo from '../../assets/logo.svg';
import fondo from '../../assets/fondo_header.jpeg';
import classes from './Header.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import HeaderCartButton from './HeaderCartButton';
import { Link } from 'react-router-dom';
import React from 'react'


const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
      <img className={classes.img_logo} src={logo} alt="es un logo"/>
            <nav className={classes.nav}>
                <ul>
                    <li><a href='/'>Productos</a></li>
                    <li><a href='/'>Catálogos</a></li>
                    <Link to='/auth'>
                      <button className={classes.button_header}>
                        <FontAwesomeIcon icon={faUser}/>
                        Iniciar sesión
                      </button>
                    </Link>                  
                    <HeaderCartButton onClick={props.onShowCart}/>
                </ul>
            </nav>
      </header>
      <div className={classes.fondo_header}>
        <img src={fondo} alt="imagen fondo header"/>
      </div>
    </Fragment>
  );
};

export default Header; 