import { Fragment, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Search from "../Search/Search";
import React from 'react'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [mealsList, setMealsList] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/goods');
      const responseData = await response.json();
      const itemsData = responseData.body.data;
      const loadedMeals = [];
      for (const key in itemsData){
        loadedMeals.push(
          {
            id: key,
            name: itemsData[key].GoodName,
            description: itemsData[key].GoodDescription,
            price: +itemsData[key].GoodSalePrice,
            image: '../images/m9.jpeg'
          }
        );
      }
      setMeals(loadedMeals);
      setMealsList(    
      loadedMeals.map((meal) =>(
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
      )))
    };
    fetchMeals();
  }, []);

  const filterItems = (search) => {
    const FILTER_DUMMY_MEALS = meals.filter(item => item.name.toString().toLowerCase().includes(search.toString().toLowerCase()));
    setMealsList(
      FILTER_DUMMY_MEALS.map((meal) =>(
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
      ))
    );
  }

    return (
      <Fragment>
        <Search filterItems={filterItems}/>
          <section className={classes.meals}>
            <div className={classes.container1}>{mealsList}</div>
          </section>
      </Fragment>
    );
  };
  
  export default AvailableMeals; 