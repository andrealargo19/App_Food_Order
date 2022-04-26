import {useRef, useState, useEffect} from 'react';
import React from "react";
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isTwelveChars = value => value.trim().length === 12;


const Checkout = (props) => {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch('https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/customers');
            const responseData = await response.json();
            const itemsData = responseData.body.data;
            const loadedCustomers = [];
            for (const key in itemsData){
                loadedCustomers.push({
                    id: key,
                    firstName: itemsData[key].FirstName,
                    lastName: itemsData[key].LastName,
                    email: itemsData[key].Email,
                    phoneNumber: itemsData[key].PhoneNumber,
                }
                );   
            }
            setCustomers(loadedCustomers);
        };
        fetchCustomers()
    },[]);
    
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

    const confirmHandler =  (event) => {
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
        FirstName: enteredName,
        LastName: enteredLastName,
        Email: enteredEmail,
        PhoneNumber: enteredPhone
        });
    }

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

    const setCustomerValues = (event) => {
        const filteredCustomer = customers.filter(customer => customer.id === event.target.value)[0];
        nameInputRef.current.value = filteredCustomer.firstName;
        lastNameInputRef.current.value = filteredCustomer.lastName;
        emailInputRef.current.value = filteredCustomer.email;
        phoneInputRef.current.value = filteredCustomer.phoneNumber;

    };

    return(
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.barra_espacio}></div>
            <div className={classes.container_customer}>
                <h3>Ingresar Cliente Nuevo</h3>
                <div className={classes.customer_registrado}>
                    <h3>Buscar Cliente existente?</h3>
                        <select defaultValue="1" onChange={setCustomerValues}>    
                            {
                                customers.map(
                                    customer => (
                                    <option value = {customer.id}>
                                        {customer.firstName} {customer.lastName}
                                    </option>
                                )
                            )
                            }
                        </select>
                </div>  
            </div>
            <div className={nameControlClasses}>
                <label htmlFor='name'>name</label>
                <input type='text' id='name' placeholder='Name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p>please enter a valid name!</p>}
            </div>
            <div className={lastNameControlClasses}>
                <label htmlFor='lastName'>lastName</label>
                <input type='text' id='lastName' placeholder='lastName' ref={lastNameInputRef}/>
                {!formInputsValidity.lastName && <p>please enter a valid lastName!</p>}
            </div>

            <div className={emailControlClasses}>
                <label htmlFor='email'>email</label>
                <input type='email' id='email' placeholder='email' ref={emailInputRef} />
                {!formInputsValidity.email && <p>please enter a valid email!</p>}
            </div>
            <div className={phoneControlClasses}>
                <label htmlFor='phone'>phone</label>
                <input type='number' id='phone' placeholder='phone Number' ref={phoneInputRef} />
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