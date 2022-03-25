import { useContext } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import React from 'react'



const HeaderCartButton = props => {
    const CartCtx = useContext(CartContext);

    const numberOfCartItems = CartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);
    
    
    
    return <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
           <CartIcon/>  
        </span>
        <span className={classes.span_cartButton}>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
};

export default HeaderCartButton;