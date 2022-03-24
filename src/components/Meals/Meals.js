import { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import Header from "../Layout/Header";
import React from 'react'
import ReactDOM from 'react-dom'


const Meals = () => {
    return (
    <Fragment>
        <Header/>
        <AvailableMeals/>
    </Fragment>
    );
};

export default Meals;