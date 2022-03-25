import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import React from 'react'


const CartIcon = props => {
    return (
        <FontAwesomeIcon icon={faCartShopping}/>    
    );
};

export default CartIcon;