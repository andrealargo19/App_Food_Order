import { useState } from "react";
import AvailableMeals from "./AvailableMeals";
import Header from "../Layout/Header";
import React from 'react'
import Cart from "../Cart/Cart";
import CartProvider from "../../store/CartProvider";



const Meals = () => {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    return (
    <CartProvider>
        <Header onShowCart={showCartHandler}/>
        {cartIsShown && <Cart onClose={hideCartHandler}/>}
        <AvailableMeals/>
    </CartProvider>
    );
};

export default Meals;