import React, { useState, useContext } from 'react';
import styles from '../../styles/Sign-in.module.css';
import apiService from '../../utils/api-service';
import { UserContext } from '../../context/user-context';

export default function SignIn() {

  const { setIsSignedin } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeHandler = (e) => {
    switch (e.target.id) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
    }
  }

  const submitHandler = e => {
    e.preventDefault();
    const user = { name, email, password };
    apiService
      .signin(user)
      .then(data => {
        if (data) {
          setIsSignedin(true);
          localStorage.setItem('user', JSON.stringify(data));
        }
      })
      .catch(err => console.log('Failed to signin ', err));
  }

  return (
    <div className={styles.signin_container}>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={e => submitHandler(e)} >
          <div className={styles.brand_logo}></div>
          <input className={styles.input}
            required
            placeholder='Name'
            id='name'
            onChange={(e) => onChangeHandler(e)}
            value={name}
          />
          <input className={styles.input}
            required
            placeholder='Email'
            id='email'
            onChange={(e) => onChangeHandler(e)}
            value={email}
          />
          <input className={styles.input}
            required
            placeholder='Password'
            id='password'
            onChange={(e) => onChangeHandler(e)}
            value={password}
          />

          <button className={styles.submit_btn} type='submit' >
            Submit
          </button>

        </form>
      </div>
    </div>
  )
}