import { Fragment } from 'react';
import logo from '../../assets/logo1.png';
import fondo from '../../assets/fondo_header.jpeg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import { Link } from 'react-router-dom';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
      <img className={classes.img_logo} src={logo} alt="es un logo"/>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <Link to='/'>
                          Productos |
                        </Link>
                    </li>
                    <li><a href='https://ip20soft.tech/JJ-POS-Backend/cruds/index.html'>Catálogos |</a></li>
                    <Link to='/profile'>
                      <li>
                     <FontAwesomeIcon icon={faUser}/>
                     </li>
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