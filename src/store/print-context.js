import { createContext } from "react";
import { useState } from "react";
import React from "react";

export const PrintContext = createContext({
    userData : {},
    cartData : {},
    checkoutData : {},
    checkoutResponse : {},
    addUserData: () => {},
    addCartData: () => {},
    addCheckoutData: () => {},
    addCheckoutResponse: () => {}
});

export const  PrintContextProvider = (props) => {
    const [userData, setUserData] = useState({});    
    const [cartData, setCartData] = useState({});    
    const [checkoutData, setCheckoutData] = useState({});    
    const [checkoutResponse, setCheckoutResponse] = useState({});  
    const AddUserData = (data) => {
        setUserData(data);
    }
    const AddCartData = (data) => {
        setCartData(data);
    }
    const AddCheckoutData = (data) => {
        setCheckoutData(data);
    } 
    const AddCheckoutResponse = (data) => {
        setCheckoutResponse(data);
    }
    return(
        <PrintContext.Provider value={{
            userData: userData,
            cartData: cartData,
            checkoutData: checkoutData,
            checkoutResponse: checkoutResponse,
            addUserData: AddUserData,
            addCartData: AddCartData,
            addCheckoutData: AddCheckoutData,
            addCheckoutResponse: AddCheckoutResponse
        }}>
            {props.children}
        </PrintContext.Provider>
    );
};

export default PrintContext;
