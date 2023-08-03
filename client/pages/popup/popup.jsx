import styles from '../../styles/Popups.module.css';
import React from "react";

export default function PopUp({ title, yesBtnTtl, noBtnTtl, setAnswer, setAddressSelected }) {

  function handleAnswer(e) {
    if (e.target.id === 'yes') setAddressSelected(true);
    else setAddressSelected(false);
    setAnswer(false);
  }

  return (
    <div className={styles.popup_container}>
      <p> {title} </p>
      <div className={styles.button_holder}>
        <button id='yes' onClick={handleAnswer}>{yesBtnTtl}</button>
        <button id='no' onClick={handleAnswer}>{noBtnTtl}</button>
      </div>
    </div>
  )
}