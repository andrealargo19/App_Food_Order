
import React from 'react'
import logo from './../../assets/logo1.png';
import classes from './Print.module.css';

function Print(props) {
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
            <p>Description:</p>
            <span className={classes.description}>Combo crispy x 6 acompañado de ensalada</span>
          </div>
          <div className={classes.item}>
            <p>Price:</p>
            <span className={classes.price}>$ 23.000</span>
          </div>
          <div className={classes.item}>
            <p>Total Amount:</p>
            <span className={classes.total_Amount}>$100.000</span>
          </div>
        </div>
          {/* //customer Detail */}
         
        <h2>Customer Details</h2>
        <div className={classes.container_CustomerDetail}>
          <div className={classes.item}>
            <p>FirstName:</p>
            <span>Ana Lucia</span>
          </div>
          <div className={classes.item}>
            <p>LastName:</p>
            <span>Rodriguez</span>
          </div>
          <div className={classes.item}>
            <p>Email:</p>
            <span>ana22@gmail.com</span>
          </div>
          <div className={classes.item}>
            <p>PhoneNumber:</p>
            <span>184536478744</span>
          </div> 
        </div>     
      </div>
    </div>
  )
}


export default Print