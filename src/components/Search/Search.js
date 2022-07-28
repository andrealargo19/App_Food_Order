import React from "react";
import classes from './Search.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";



const Search = (props) => {
    const Filter = (event) => {
        const filterValue = event.target.value;
        props.filterItems(filterValue);
    }
    return(
        <section className={classes.general_section}>
            <div className={classes.container_inputs}>
                <input type="text" placeholder="Buscar Producto..." onChange={Filter}/>
                <FontAwesomeIcon style={{color:"gray"}} icon={faMagnifyingGlass}/>
            </div>
        </section>
    );
}

export default Search;
