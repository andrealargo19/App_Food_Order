import {useRef, useState, useEffect} from 'react';
import React from "react";
import classes from './Checkout.module.css';


const isEmpty = value => value.trim() === '';
const isTwelveChars = value => value.trim().length === 12;


const Checkout = (props) => {
    const [customers, setCustomers] = useState([]);
    const [disabled , setDisabled] = useState(false); 
    const noRegisteredId = "1";
    const newCustomerId = "999";
    
    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch('https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/customers');
            const responseData = await response.json();
            const itemsData = responseData.body.data;
            const loadedCustomers = [];
            for (const key in itemsData){
                loadedCustomers.push({
                    id: itemsData[key].CustomerId,
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
    const customerInputRef = useRef();

    const confirmHandler =  (event) => {
        event.preventDefault(); 
        
        const enteredName = nameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredCustomer = customerInputRef.current.value;
        
        if(customerInputRef.current.value !== noRegisteredId) {
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
        }
  
        props.onConfirm({
        FirstName: enteredName,
        LastName: enteredLastName,
        Email: enteredEmail,
        PhoneNumber: enteredPhone,
        CustomerId: enteredCustomer,
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

        if(customerInputRef.current.value === noRegisteredId) {
            setDisabled(true);
            nameInputRef.current.value = "";
            lastNameInputRef.current.value = "";
            emailInputRef.current.value = "";
            phoneInputRef.current.value = "";


        } else if ( customerInputRef.current.value === newCustomerId) {
            setDisabled(false);
            nameInputRef.current.value = "";
            lastNameInputRef.current.value = "";
            emailInputRef.current.value = "";
            phoneInputRef.current.value = "";


        } else {
            setDisabled(false);
            const filteredCustomer = customers.filter(customer => customer.id === event.target.value)[0];
            nameInputRef.current.value = filteredCustomer.firstName;
            lastNameInputRef.current.value = filteredCustomer.lastName;
            emailInputRef.current.value = filteredCustomer.email;
            phoneInputRef.current.value = filteredCustomer.phoneNumber;
        }
    };

    return(
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.barra_espacio}></div>
            <div className={classes.container_customer}>
                <h3>Ingresar Cliente Nuevo</h3>
                <div className={classes.customer_registrado}>
                    <h3>Buscar Cliente existente?</h3>
                        <select id='customer' ref={customerInputRef} defaultValue={noRegisteredId} onChange={setCustomerValues}>  
                            <option key={newCustomerId} value ={newCustomerId}>Nuevo Usuario</option>
                            {/* <option key={noRegisteredId} value ={noRegisteredId} disabled={disabled}>Usuario sin Registrarse</option> */}
                                {
                                    customers.map(customer => (
                                        <option key={customer.id} value = {customer.id}>
                                            {customer.firstName} {customer.lastName} {customer.id} 
                                        </option>
                                    )
                                    )
                                }
                        </select>
                </div>  
            </div>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Nombre</label>
                <input type='text' id='name' placeholder='Nombre' disabled={disabled}  ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Introduce un nombre válido!</p>} 
            </div>
            <div className={lastNameControlClasses}>
                <label htmlFor='lastName'>Apellidos</label>
                <input type='text' id='lastName' placeholder='Apellidos' disabled={disabled} ref={lastNameInputRef}/>
                {!formInputsValidity.lastName && <p>Introduce apellidos válidos!</p>}
            </div>
            <div className={emailControlClasses}>
                <label htmlFor='email'>Correo Electrónico</label>
                <input type='email' id='email' placeholder='Correo Electrónico' disabled={disabled} ref={emailInputRef} />
                {!formInputsValidity.email && <p>Introduce un correo electrónico válido!</p>}
            </div>
            <div className={phoneControlClasses}>
                <label htmlFor='phone'>Teléfono</label>
                <input type='number' id='phone' placeholder='Teléfono' disabled={disabled} ref={phoneInputRef} />
                {!formInputsValidity.phone && <p>Introduce un número de teléfono válido (12 dígitos máximo)</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancelar</button>
                <button>Confirmar</button>
            </div>
        </form>
    );
};

export default Checkout;