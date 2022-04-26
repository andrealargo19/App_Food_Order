import React from 'react';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import Checkout from './Checkout';



const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSumit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoverHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        const cartItem = { ...item, amount: 1 };
        cartCtx.addItem(cartItem);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async(userData) => {
        console.log(userData);
        setIsSubmitting(true);
        await fetch('https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/customers', 
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                'data': userData
                })
            });

        //PUT REQUEST 

        // await fetch('https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/customers', 
        //     {
        //         method: 'PUT',
        //         headers: {
        //         'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //         'data': userData
        //         })
        //     });



       setIsSubmitting(false);
       setDidSumit(true);
       cartCtx.clearCart();
    };

    const cartItems = (
        <div className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem  
                key={item.id} 
                name={item.name} 
                description={item.description} 
                amount={item.amount} 
                price={item.price}
                onRemove={cartItemRemoverHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null,item)}
                />
            ))}
        </div>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
                Close
            </button>
        {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
                Order
            </button>
            )}
        </div>
    );
    
    const cartModalContent = (
    <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
        )}
        {!isCheckout && modalActions}  
    </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;
    
    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
        );

    return(
        <Modal onClose={props.onClose}>
           {!isSubmitting && !didSubmit && cartModalContent}  
           {isSubmitting && isSubmittingModalContent}
           {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;