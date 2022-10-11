import { Fragment, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Search from "../Search/Search";
import React from 'react'


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [mealsList, setMealsList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

    
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://ip20soft.tech/JJ-POS-Backend/api/v1/index.php/goods');
      
      if(!response.ok) {
        throw new Error('Algo salió mal!');
      }

      const responseData = await response.json();
      const itemsData = responseData.body.data;
      const loadedMeals = [];
      for (const key in itemsData){
        loadedMeals.push({
          id: itemsData[key].GoodId,
          name: itemsData[key].GoodName,
          description: itemsData[key].GoodDescription,
          price: +itemsData[key].GoodSalePrice,
          comboId: +itemsData[key].GoodComboId,
          image: itemsData[key].GoodImage
        }
        );
      }
      setMeals(loadedMeals);
      setIsLoading(false);

    // Estado para el primer filtro
      setMealsList(    
        loadedMeals.map((meal) =>(
          <Card key={meal.id}>
            <MealItem 
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
              image={meal.image}
              comboId={meal.comboId}
            />
          </Card>
      )))
  };

      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, []);

      if(isLoading){
        return(
          <section className={classes.MealsLoading}>
            <p>Cargando...</p>
          </section>
        );
      }


      if (httpError){
        return ( 
          <section className={classes.MealsError}>
            <p>{httpError}</p>
          </section>
        );
      }

const filterItems = (search) => {
  const FILTER_DUMMY_MEALS = meals.filter(item => item.name.toString().toLowerCase().includes(search.toString().toLowerCase()));
    setMealsList(
      FILTER_DUMMY_MEALS.map((meal) =>(
        <Card key={meal.id}>
          <MealItem 
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            image={meal.image}
            comboId={meal.comboId}
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