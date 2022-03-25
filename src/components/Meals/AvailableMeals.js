import { Fragment } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import React from 'react'



const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Combo 2x hamburguesa',
      description: '2 hamburguesas, pollo krispy, papas y gaseosa...',
      price: 22.99,
      image:'../images/m1.jpeg',
    },
    {
      id: 'm2',
      name: 'Pollo crispy Box 6 piezas',
      description: ' 8 piezas de pollo y salsa BBQ...',
      price: 16.5,
      image:'../images/m2.jpeg',
    },
    {
      id: 'm3',
      name: 'Menú Nuggest original',
      description: 'Menú nuggest de pollo y salsa BBQ...',
      price: 12.99,
      image:'../images/m3.jpeg',
    },
    {
      id: 'm4',
      name: 'Menú muslos crispys y papas francesas',
      description: 'Muslos de pollo original con papas y gaseosa...',
      price: 18.99,
      image:'../images/m4.jpeg',
    },
    {
        id: 'm5',
        name: 'Combo supremo',
        description: 'pollo crispy box 8 piezas, papas y gaseosa...',
        price: 18.99,
        image:'../images/m5.jpeg',
    },

    {
        id: 'm6',
        name: 'menú combinado',
        description: '3 piezas de pollo crispy, hamburguesa, papas y gaseosa...',
        price: 18.99,
        image:'../images/m6.jpeg',
    },
    {
        id: 'm7',
        name: 'menú tradicional',
        description: '10 piezas de pollo crispy...',
        price: 18.99,
        image:'../images/m7.jpeg',
    },
    {
        id: 'm8',
        name: 'Menú familiar',
        description: '15 piezas de pollo y papas a la francesa...',
        price: 18.99,
        image:'../images/m8.jpeg',
    },
    {
        id: 'm9',
        name: 'Menú personal',
        description: 'hamburguesa crispy...',
        price: 18.99,
        image:'../images/m9.jpeg',
    },

  ];


const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map((meal) =>(
    <Card>
    <MealItem 
    key={meal.id}
    id={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
    image={meal.image}
    />
    </Card>
    ));

    return (
      <Fragment>
          <section className={classes.meals}>
            <div className={classes.container1}>{mealsList}</div>
          </section>
      </Fragment>
    );
  };
  
  export default AvailableMeals; 