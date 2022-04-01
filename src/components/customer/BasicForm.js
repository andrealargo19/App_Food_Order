import classes from './BasicForm.module.css'
import { Fragment } from 'react/cjs/react.production.min';
import React from 'react';

const BasicForm = (props) => {
  return (
    <Fragment>
      <form className={classes.general_form}>
          <div className={classes.title_form}>
            <h3>Agregar Cliente nuevo</h3>
          </div>
          <div className={classes.control_checkboxs}>
              <input type="checkbox" id='SI'/> <label htmlFor="SI">SI</label>
              <input type="checkbox" id='NO'/> <label htmlFor='NO'>NO</label>
          </div>
          <div className={classes.controls_group}>
            <div className={classes.form_control}>
              <label htmlFor='name'>Name</label>
              <input type='text' id='name' />
            </div>
            <div className={classes.form_control}>
              <label htmlFor='name'>E-Mail Address</label>
              <input type='text' id='name' />
            </div>
            <div className={classes.form_control}>
              <label htmlFor='name'>Phone Number</label>
              <input type='number' id='number' />
            </div>
            <div className={classes.form_actions}>
              <button>Submit</button>
            </div>
        </div>
      </form>
    </Fragment>  
  );
};

export default BasicForm;
