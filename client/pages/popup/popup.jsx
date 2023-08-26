import styles from '../../styles/Popups.module.css';
import React from 'react';

export default function PopUp({
  title,
  yesBtnTtl,
  noBtnTtl,
  setAnswer,
  pickUpAddressSelected,
  setPickUpAddressSelected,
  setDropOffAddressSelected,
}) {
  function handleAnswer(event) {
    if (event.target.id === 'yes') {
      if (!pickUpAddressSelected) {
        setPickUpAddressSelected(true);
        setAnswer(false);
      } else {
        setDropOffAddressSelected(true);
      }
    } else setAnswer(false);
  }

  return (
    <div className={styles.popup_container}>
      <p> {title} </p>
      <div className={styles.button_holder}>
        <button id="yes" onClick={handleAnswer}>
          {yesBtnTtl}
        </button>
        <button id="no" onClick={handleAnswer}>
          {noBtnTtl}
        </button>
      </div>
    </div>
  );
}
