import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { PrintContext } from '../../store/print-context';
import logo from './../../assets/logo1.png';
import classes from './Print.module.css';




//main function
function Print(props) {
  const checkoutCtx = useContext(PrintContext);
  const checkoutResponse = checkoutCtx.checkoutResponse.data;
  const detailsId = checkoutResponse.Details;
  const userId = checkoutResponse.UserId;
  const saleRecordId = checkoutResponse.ExitId;
  const checkoutData = checkoutCtx.checkoutData;
  const totalAmount = checkoutCtx.cartData;
  const userData = checkoutCtx.userData;
  const navigate = useNavigate();



  console.log(detailsId);
  console.log(userId);
  console.log(saleRecordId);
  console.log(checkoutData);
  console.log(totalAmount);
  console.log(userData);



  const endCheckout = () => {
    navigate("/Meals");
  }

  return (
    <div className={classes.general_container}>
      <img className={classes.img_logo} src={logo} alt="es un logo"/>
      <h1>Print your Recept</h1>
      <div className={classes.container_recept}>
        <h2>Order details</h2>
        <div className={classes.container_order}>
          <div className={classes.item}>
            <p>Order Name:</p>
            <span className={classes.name}>Combo 1 familiar</span>
          </div>
          <div className={classes.item}>
            <p>Quantity:</p>
            <span className={classes.description}>5</span>
          </div>
          <div className={classes.item}>
            <p>Price:</p>
            <span className={classes.price}>$ 23.000</span>
          </div>
          <div className={classes.item}>
            <p>Total Amount:</p>
            <span className={classes.total_Amount}>$ {totalAmount} pesos</span>
          </div>
        </div>
          {/* //customer Detail */}
         
        <h2>Customer Details</h2>
        <div className={classes.container_CustomerDetail}>
          <div className={classes.item}>
            <p>FirstName:</p>
            <span>{userData.FirstName}</span>
          </div>
          <div className={classes.item}>
            <p>LastName:</p>
            <span>{userData.LastName}</span>
          </div>
          <div className={classes.item}>
            <p>Email:</p>
            <span>{userData.Email}</span>
          </div>
          <div className={classes.item}>
            <p>PhoneNumber:</p>
            <span>{userData.PhoneNumber}</span>
          </div> 
        </div>     
      </div>

      <button onClick={endCheckout}>Accept</button>
    </div>
  )
}


export default Print