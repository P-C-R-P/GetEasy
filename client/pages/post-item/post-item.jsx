import React from 'react';
import styles from '../../styles/Sign-in.module.css';
import postStyles from '../../styles/PostItem.module.css';
import Map from '../map/map';
import PopUp from '../popup/popup';
import { useState } from 'react';
import apiService from '../../utils/api-service';


export default function PostItem({ setIsCreateItem }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState();

  const [showPopup, setShowPopup] = useState(false);
  const [pickUpAddressSelected, setPickUpAddressSelected] = useState(false);
  const [addresses, setAddress] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const onChangeHandler = (e) => {
    switch (e.target.id) {
      case 'name':
        setName(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'weight':
        setWeight(e.target.value);
        break;
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const item = await apiService.inserItem({
        name, description, weight, userId: user.id,
      });

      for (let address of addresses) {
        await apiService.inserAddress({
          itemId: item.id, lat: address.lat, lng: address.lng
        });
      }
      setIsCreateItem(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={postStyles.post_container}>

      <div className={postStyles.logo_input_container}>
        <div className={styles.brand_logo}></div>

        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={e => submitHandler(e)} >
            <input className={styles.input}
              required
              placeholder='Name'
              id='name'
              onChange={(e) => onChangeHandler(e)}
              value={name}
            />
            <input className={styles.input}
              required
              placeholder='Description'
              id='description'
              onChange={(e) => onChangeHandler(e)}
              value={description}
            />
            <input className={styles.input}
              required
              type="number"
              placeholder='weight'
              id='weight'
              onChange={(e) => onChangeHandler(e)}
              value={weight}
            />

            <button type='submit'
              disabled={addresses.length !== 2}
              className={styles.submit_btn}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className={postStyles.map_container}>
        {
          showPopup && !pickUpAddressSelected &&
          <PopUp
            title='Please confirm that you selected address?'
            yesBtnTtl='Yes'
            noBtnTtl='No'
            setAnswer={setShowPopup}
            setAddressSelected={setPickUpAddressSelected}
          />
        }
        <Map
          setShowPopup={setShowPopup}
          pickUpAddressSelected={pickUpAddressSelected}
          setAddress={setAddress}
        />
      </div>

    </div>
  )
}