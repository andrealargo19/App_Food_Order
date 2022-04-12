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
                <label>Search by category</label>
                <select>
                    <option selected value="Combos">Combos</option>
                    <option value="bebidas">bebidas</option>
                    <option value="pollo">pollo</option>
                    <option value="Snacks">Snacks</option>
                </select>
            </div>

        </section>
    );
}

export default Search;
