import React, { useState, useContext } from 'react';
import styles from '../../styles/Sign-in.module.css';
import apiService from '../../utils/api-service';
import { UserContext } from '../../context/user-context';

export default function SignIn () {
  const { setIsSignedIn } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedButton, setSelectedButton] = useState('');

  const buttonHandler = event => {
    if (event.target.value === 'signUp') {
      setSelectedButton('signUp');
    } else {
      setSelectedButton('logIn');
    }
  };

  const onChangeHandler = (event) => {
    switch (event.target.id) {
      case 'name':
        setName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
    }
  };

  const submitHandler = async event => {
    if (selectedButton === 'signUp') {
      signUpHandler(event);
    } else {
      logInHandler(event);
    }
  };

  const logInHandler = async event => {
    event.preventDefault();
    const user = { name, email, password };
    const check = await apiService.checkEmail(user.email);
    if (check.key) {
      return alert('Email is not registered, please sign up.');
    } else {
      if (check.name !== user.name) {
        return alert('Email already registered with a different username.');
      }
    }
    apiService
      .logIn(user)
      .then(data => {
        if (data.key) {
          return alert(data.key);
        }
        setIsSignedIn(true);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch(err => console.log('Failed to sign in: ', err));
  };

  const signUpHandler = async event => {
    event.preventDefault();
    const user = { name, email, password };
    const check = await apiService.checkEmail(user.email);
    if (check.name) {
      return alert('Email already registered.');
    }
    apiService
      .signUp(user)
      .then(data => {
        setIsSignedIn(true);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch(err => console.log('Failed to sign in: ', err));
  };

  return (
    <div className={styles.signin_container}>
      <div className={styles.form_container}>
        <form
          className={styles.form}
          onSubmit={(event) => submitHandler(event)}
        >
          <div className={styles.brand_logo}></div>
          <h1>Welcome to Get Easy</h1>
          <label htmlFor="name">Name:</label>
          <input
            className={styles.input}
            required
            placeholder="Name"
            id="name"
            onChange={(event) => onChangeHandler(event)}
            value={name}
          />
          <label htmlFor="email">Email:</label>
          <input
            className={styles.input}
            required
            type="email"
            placeholder="Email"
            id="email"
            onChange={(event) => onChangeHandler(event)}
            value={email}
          />
          <label htmlFor="password">Password:</label>
          <input
            className={styles.input}
            required
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least 8 characters, including one number, one uppercase letter and one lowercase letter."
            placeholder="Password"
            id="password"
            onChange={(event) => onChangeHandler(event)}
            value={password}
          />

          <button
            className={styles.submit_btn}
            type="submit"
            value="signUp"
            onClick={buttonHandler}
          >
            Sign up
          </button>

          <button
            className={styles.submit_btn}
            type="submit"
            value="logIn"
            onClick={buttonHandler}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
