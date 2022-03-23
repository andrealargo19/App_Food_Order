import classes from './HeaderCartButton.module.css';
import CartIcon from "./CartIcon";


const HeaderCartButton = props => {
    return <button className={classes.button}>
        <span className={classes.icon}>
           <CartIcon/>  
        </span>
        <span className={classes.span_cartButton}>Your Cart</span>
        <span className={classes.badge}>3</span>
    </button>
};

export default HeaderCartButton;