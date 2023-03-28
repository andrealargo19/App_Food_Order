import {useRef, useState} from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import React from 'react'


const MealItemForm = (props) => {
    const [amountIsValid, setamountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        
        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 0.5 ||
            enteredAmountNumber > 10 
        ){
            setamountIsValid(false);
            return; 
        }

        props.onAddToCart(enteredAmountNumber);
    };  

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
            ref={amountInputRef}
            label='Cantidad' 
            input={{
            id: 'amount',
            type: 'number',
            min: '0.5',
            max: '10',
            step: '0.5',
            defaultValue: '1'
            }} 
            />
            <button> + Agregar</button>
            {!amountIsValid && <p>por favor ingrese un número válido (0.5-10)</p>}
        </form>
    );
};

export default MealItemForm;