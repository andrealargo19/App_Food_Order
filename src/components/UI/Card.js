import classes from './Card.module.css';
import React from 'react'
import ReactDOM from 'react-dom'

const Card = (props) => {
    return <div className={classes.card}>{props.children}</div>
};

export default Card;