import React from 'react';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import Checkout from './Checkout';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import PrintContext from '../../store/print-context';


//main function
const Cart = props => {
   
    const checkoutCtx = useContext(PrintContext);
    const authCtx = useContext(AuthContext);
    const noRegisteredId = "1";
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
        //verifytoken
        const urlTokenCompare = 'https://www.ip20soft.tech/JJ-POS-Backend/api/v1/index.php/users/verifyToken?' + new URLSearchParams({
            UserId: authCtx.userId,
            Token: authCtx.token,
        });

        await fetch(urlTokenCompare).then(res => {
            if (res.status === 200) {
                console.log('usuario verificado!');  
            } else if (res.status !== 200) {
                console.log("credentials not valid");
            }
        });
        
        //creando new customers
        setIsSubmitting(true);

        //condicional para POST y PUT
        if (userData.CustomerId !== noRegisteredId) {
            let customerData = {
                FirstName: userData.FirstName,
                LastName: userData.LastName,
                Email: userData.Email,
                PhoneNumber: userData.PhoneNumber  
            };

            let metodoCustomer = "POST";
            //PUT
                
            if (userData.CustomerId !== '99') {
                metodoCustomer = "PUT"
                customerData = userData;
            }
                
            //fetch
            await fetch('https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/customers',
            {
                method: metodoCustomer,
                headers: 
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'data': customerData
                })
            });
        }

        //fetch POST for sending Sales
        const checkoutItems = cartCtx.items.map(
            (item) => {
                return {
                    "GoodId": +item.id,
                    "GoodName": item.name,
                    "Quantity": item.amount,
                    "GoodSalePrice": item.price,
                    "ComboId": item.comboId
                }
            }
        );

        console.log(checkoutItems);
        const checkoutBody = {
            "data": {
                "ExitDate": new Date().toISOString().slice(0, 10),
                "UserId": +authCtx.userId,
                "CustomerId": +userData.CustomerId,
                "Details": checkoutItems
            }
        }
        console.log("Checkout body");
        console.log(checkoutBody);

        const response = await fetch('https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/sales/doCheckout', 
        {
            method: "POST",
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkoutBody)            
        })

        const responseData = await response.json();
        console.log(responseData);
        if (responseData.httpResponseCode === 200) {
            checkoutCtx.addUserData(userData);
            checkoutCtx.addCartData(cartCtx.totalAmount);
            checkoutCtx.addCheckoutData(checkoutBody);
            checkoutCtx.addCheckoutResponse(responseData.body);    
        } else {
            console.log("error");
        }

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
                Cerrar
            </button>
        {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
                Orden
            </button>
            )}
        </div>
    );
    
    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
            <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
            )}
            {!isCheckout && modalActions}  
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Enviando datos de la orden...</p>;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>La orden se envió satisfactoriamente!</p>
            <div className={classes.actions}>
                <Link to="/PrintPage">
                <button className={classes.button} onClick={props.onClose}>
                    Imprimir
                </button>
                </Link>
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