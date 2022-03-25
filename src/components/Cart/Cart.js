import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import React from 'react'


const Cart = props => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItems = (
        <div className={classes['cart-items']}>
            <div className={classes.cart_title}>
                <p>Product</p>
                <p>Description</p>
                <p>Unit price</p>
            </div>
            {cartCtx.items.map((item) => (
                <div className={classes.cart_items_descrip}>
                    <p>{item.name}</p>
                    <p>{item.description}</p> 
                    <p>{item.price}</p>                   
                </div>
            ))}
        </div>
    );
    
    return(
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;