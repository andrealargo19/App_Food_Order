import React, { useContext, useEffect, useState } from 'react';
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
  const [saleDetails, setSaleDetails] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getDataTicket = async() => {
      const response = await fetch('https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/sales/'+saleRecordId);
      const res = await response.json();
      if (res.httpResponseCode === 200) {
        setSaleDetails(res.body.data);
      }
    };
    getDataTicket();
  },[]);

  useEffect(() => {
    if (saleDetails[saleRecordId] !== undefined) {
      setItems(saleDetails[saleRecordId].Details);
    }
  }, [saleDetails])

  // console.log(detailsId);
  // console.log(userId);
  // console.log(saleRecordId);
  // console.log(checkoutData);
  // console.log(totalAmount);
  // console.log(userData);
  // console.log(saleDetails);
  // console.log(items);

  const endCheckout = () => {
    navigate("/Meals");
  }

  return (
    <div className={classes.general_container}>
      <h6>date</h6>
      <img className={classes.img_logo} src={logo} alt="es un logo"/>
      <h1>Print your Recept</h1>
      <div className={classes.container_recept}>
        <h2>Order details</h2>
        
        {/* //Items */} 
        <div className={classes.container_order}>
            <div>
                {items.map(item => {
                    return (
                        <div key={item.GoodId}>
                          <h1>-------------------------</h1>
                          <div className={classes.item}>
                              <p>Product Name:</p>
                              <span className={classes.name}>{item.GoodName}</span>
                          </div>
                          <div className={classes.item}>
                              <p>Quantity:</p>
                              <span className={classes.description}>{item.Quantity}</span>
                          </div>
                          <div className={classes.item}>
                              <p>Product Price:</p>
                              <span className={classes.price}>${item.SalePrice}</span>
                          </div>
                        </div>
                    )
                })}
            </div>       
        </div> 

        {/* //Total Amount */} 
        
        <div className={classes.item}>
        <h1>-------------------------</h1>
          <p>Total Amount:</p>
          <span className={classes.total_Amount}>$ {totalAmount} pesos</span>
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