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
  const [weightMeasurement, setWeightMeasurement] = useState('kg');

  const [showPopup, setShowPopup] = useState(false);
  const [pickUpAddressSelected, setPickUpAddressSelected] = useState(false);
  const [addresses, setAddress] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    switch (e.target.id) {
      case 'name':
        console.log('hey pretty');
        setName(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'weight':
        setWeight(e.target.value);
        break;
      case 'weightMeasurement':
        console.log('hey pretty');
        setWeightMeasurement(e.target.value);
        console.log(weightMeasurement);
        break;
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const item = await apiService.createItem({
        name, description, weight, weightMeasurement, userId: user.id,
      });
      console.log(item);
      for (let address of addresses) {
        await apiService.createAddress({
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

            <div>
              <input className={styles.input}
                required
                type="number"
                placeholder='Weight'
                id='weight'
                onChange={(e) => onChangeHandler(e)}
                value={weight}
              />
              <select name="measurement" id="weightMeasurement" defaultValue={weightMeasurement} value={weightMeasurement} onChange={(e) => onChangeHandler(e)}>

                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="lb">lb</option>
                <option value="oz">oz</option>
              </select>
            </div>

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