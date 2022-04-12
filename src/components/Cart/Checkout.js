import {useRef, useState} from 'react';
import React from "react";
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isTwelveChars = value => value.trim().length === 12;


const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        lastName: true,
        email: true,
        phone: true,
    });

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const phoneInputRef = useRef();
    const lastNameInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault(); 

        const enteredName = nameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;


        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredLastNameIsValid = !isEmpty(enteredLastName);
        const enteredEmailIsValid = !isEmpty(enteredEmail) | isTwelveChars(enteredPhone);
        const enteredPhoneIsValid = !isEmpty(enteredEmail) | isTwelveChars(enteredPhone);

        setFormInputsValidity({
            name: enteredNameIsValid,
            lastName: enteredLastNameIsValid,
            email: enteredEmailIsValid,
            phone: enteredPhoneIsValid,
        });

        const formIsValid =
        enteredNameIsValid &&
        enteredLastNameIsValid &&
        enteredEmailIsValid &&
        enteredPhoneIsValid;

        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            lastName: enteredLastName,
            email: enteredEmail,
            phone: enteredPhone
        });

    };


    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`;

    const lastNameControlClasses = `${classes.control} ${
        formInputsValidity.lastName ? '' : classes.invalid
    }`;

    const emailControlClasses = `${classes.control} ${
        formInputsValidity.email ? '' : classes.invalid
    }`;

    const phoneControlClasses = `${classes.control} ${
        formInputsValidity.phone ? '' : classes.invalid
    }`;


    return(
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.container_customer}>
                <h3>Informacion personal/Cliente nuevo</h3>
                <div className={classes.customer_registrado}>
                    <h3>Ya es cliente registrado?</h3>
                    <select>
                        <option>Cliente no registrado</option>
                        <option>Pedro Manuel</option>
                        <option>Andres josé</option>
                        <option>Patricia</option>
                        <option>Nicolas</option>
                        <option>Yuqui</option>
                        <option>Alaia</option>
                        <option>Roberto</option>
                        <option>Armando</option>
                        <option>Ana</option>
                    </select>
                </div>  
            </div>
            <div className={nameControlClasses}>
                <label htmlFor='name'>name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p>please enter a valid name!</p>}
            </div>
            <div className={lastNameControlClasses}>
                <label htmlFor='lastName'>lastName</label>
                <input type='text' id='lastName' ref={lastNameInputRef}/>
                {!formInputsValidity.lastName && <p>please enter a valid lastName!</p>}
            </div>

            <div className={emailControlClasses}>
                <label htmlFor='email'>email</label>
                <input type='email' id='email' ref={emailInputRef} />
                {!formInputsValidity.email && <p>please enter a valid email!</p>}
            </div>
            <div className={phoneControlClasses}>
                <label htmlFor='phone'>phone</label>
                <input type='number' id='phone' ref={phoneInputRef} />
                {!formInputsValidity.phone && <p>please enter a valid phone (12 characters max)</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button>Confirm</button>
            </div>

        </form>
    );
};

export default Checkout;