import { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import Header from "../Layout/Header";


const Meals = () => {
    return (
    <Fragment>
        <Header/>
        <AvailableMeals/>
    </Fragment>
    );
};

export default Meals;