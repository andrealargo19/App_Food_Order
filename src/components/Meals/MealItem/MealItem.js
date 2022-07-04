import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import React from 'react'
import CartContext from '../../../store/cart-context';




const MealItem = props => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;
    
    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
            description: props.description,
            comboId: props.comboId
        });
    };

    return(
        <div className={classes.meal}>
            <img src={props.image} alt="alt"/>
            <div>
                <h2>{props.name}</h2>
            </div>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
        </div>
    );
};

export default MealItem;