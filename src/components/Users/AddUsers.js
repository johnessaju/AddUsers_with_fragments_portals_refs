import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import classes from './AddUsers.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
  const [error, setError] = useState();

  const enteredUserNameRef = useRef();
  const enteredAgeRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUserName = enteredUserNameRef.current.value;
    const enteredAge = enteredAgeRef.current.value;
    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).'
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age(>0).'
      });
      return;
    }
    props.onAddUser(enteredUserName, enteredAge);
    enteredUserNameRef.current.value = '';
    enteredAgeRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={enteredUserNameRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={enteredAgeRef} />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
