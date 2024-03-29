import { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleUser} from '@fortawesome/free-solid-svg-icons';
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';



const AuthForm = () => {
  const navigate = useNavigate();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();


  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUserName = userNameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    
    setIsLoading(true);
    let url;
    if (isLogin) {
      url = 
      'https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/users/doLogin'
        fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            data: {
              Username: enteredUserName,
              Password: enteredPassword
            }
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Nombre de usuario/Contraseña incorrecto';
            throw new Error(errorMessage);
          })
        }                                     

        })

        .then((data) => {
          const token = data.body.data.Token;
          const userId = data.body.data.UserId;
          const expirationTime = new Date(
            new Date().getTime() + (1000 * 60 * 60 * 2)
          );
          
          authCtx.login(token, userId, expirationTime.toISOString());
          navigate('/');
        })

        .catch((err) => {
          alert(err.message);
        });

    } else {
      url = 
      'https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/users';
      fetch(url,{
        method: 'POST',
        body: JSON.stringify({
          data: {
            Username: enteredUserName,
            Password: enteredPassword,
            FirstName: firstNameInputRef.current.value,
            LastName: lastNameInputRef.current.value  
          }
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then(res => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
          let errorMessage = 'Nombre de usuario/Contraseña incorrecto';
          throw new Error(errorMessage);
          });
        }
      })
      
      .then((data) => {
        console.log(data);
        setIsLogin(true);       
      })
      .catch((err) => {
        alert(err.message);
      });
    };
  }


  const cartPersonalData = (
    <React.Fragment>
      <div className={classes.control}>
        <label htmlFor='firstName'></label>
        <input type='text' id='firstName' placeholder='Introduce tu(s) nombre(s)...' required ref={firstNameInputRef} />
        <FontAwesomeIcon icon={faCircleUser}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='lastName'></label>
        <input type='text' id='lastName' placeholder='Introduce tu(s) apellido(s)...' required ref={lastNameInputRef} />
        <FontAwesomeIcon icon={faCircleUser}/>
      </div>
    </React.Fragment>
  );

  return (
    <section className={classes.auth}>
      <FontAwesomeIcon icon={faCircleUser}/>
      <h1>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
      <form onSubmit={submitHandler}>
        {isLogin ? 'Iniciar sesión' : cartPersonalData}

        <div className={classes.control}>
          <label htmlFor='userName'></label>
          <input type='text' id='userName' placeholder='Nombre de usuario...' required ref={userNameInputRef} />
          <FontAwesomeIcon icon={faCircleUser}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'></label>
          <input type='password' id='password' placeholder='Contraseña...' required ref={passwordInputRef} />
          <FontAwesomeIcon icon={faUnlockKeyhole}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>}
          {isLoading && <p>Enviando solicitud...</p>}
        </div>
        <div className={classes.actions_toggle}>
        <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Crear una cuenta' : 'Iniciar sesión con una cuenta existente'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;