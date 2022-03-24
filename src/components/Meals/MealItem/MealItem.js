import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import Cart from './../../Cart/Cart';
import React from 'react'
import ReactDOM from 'react-dom'


const MealItem = props => {
    const price = `$${props.price.toFixed(2)}`;

    return(
        <div className={classes.meal}>
            <img src={props.image} alt="alt"/>
            <div>
                <h2>{props.name}</h2>
            </div>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
            <div>
                <MealItemForm/>
                <Cart/>

            </div>
        </div>
    );
};

export default MealItem;