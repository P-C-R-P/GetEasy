import React from 'react';
import styles from '../../styles/Navbar.module.css';
import '../../public/images/get-easy-brand-icon.png';

export default function Navbar({ setIsOwnItem, isOwnItem, setIsCreateItem }) {
  function onClickHandler() {
    setIsOwnItem((value) => !value);
    setIsCreateItem(false);
  }

  function handleLogoClick() {
    setIsOwnItem(false);
    setIsCreateItem(false);
  }

  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar_branding}>
        <div
          id="brand-logo"
          onClick={() => handleLogoClick()}
          className={styles.brand_logo}
        ></div>
        <h1>get easy</h1>
      </div>
      <div className={styles.button_container}>
        <ul>
          <li onClick={() => onClickHandler()}>
            {' '}
            {isOwnItem ? 'all items' : 'my items'}
          </li>
          <li onClick={() => setIsCreateItem(true)}>create item</li>
        </ul>
      </div>
    </div>
  );
}
