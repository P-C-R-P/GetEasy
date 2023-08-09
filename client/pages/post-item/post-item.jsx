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
  const [dropOffAddressSelected, setDropOffAddressSelected] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const onChangeHandler = (event) => {
    console.log(event.target.value);
    switch (event.target.id) {
      case 'name':
        setName(event.target.value);
        break;
      case 'description':
        setDescription(event.target.value);
        break;
      case 'weight':
        setWeight(event.target.value);
        break;
      case 'weightMeasurement':
        setWeightMeasurement(event.target.value);
        break;
      case 'pick-up-address':
        setAddresses([event.target.value]);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const item = await apiService.createItem({
        name, description, weight, weightMeasurement, userId: user.id,
      });
      console.log(item);
      console.log(addresses);
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
        <div className={postStyles.brand_logo}></div>

        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={(event) => submitHandler(event)}>
            <input
              className={styles.input}
              required
              placeholder="Name"
              id="name"
              onChange={(event) => onChangeHandler(event)}
              value={name}
            />
            <input
              className={styles.input}
              required
              placeholder="Description"
              id="description"
              onChange={(event) => onChangeHandler(event)}
              value={description}
            />

            <div className={postStyles.weight_div}>
              <input
                className={styles.input}
                required
                type="number"
                placeholder="Weight"
                id="weight"
                onChange={(event) => onChangeHandler(event)}
                value={weight}
              />
              <select
                className={postStyles.select_measurement}
                name="measurement"
                id="weightMeasurement"
                defaultValue={weightMeasurement}
                value={weightMeasurement}
                onChange={(event) => onChangeHandler(event)}
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="lb">lb</option>
                <option value="oz">oz</option>
              </select>
            </div>
            <div className={postStyles.address_div}>
              <input
                className={styles.input}
                id="pick-up-address"
                placeholder="Pick up address" value={addresses[0].lat}
                onChange={(event) => onChangeHandler(event)}
              />
              <input
                className={styles.input}
                id="drop-off-address"
                placeholder="Drop off address" value={addresses[1]}
                onChange={(event) => onChangeHandler(event)}
              />
            </div>

            <button
              type="submit"
              disabled={addresses.length !== 2}
              className={styles.submit_btn}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className={postStyles.map_container}>
        {showPopup && (!pickUpAddressSelected || !dropOffAddressSelected) && (
          <PopUp
            title="Please confirm selected address."
            yesBtnTtl="Yes"
            noBtnTtl="No"
            setAnswer={setShowPopup}
            pickUpAddressSelected={pickUpAddressSelected}
            setPickUpAddressSelected={setPickUpAddressSelected}
            dropOffAddressSelected={dropOffAddressSelected}
            setDropOffAddressSelected={setDropOffAddressSelected}
          />
        )}
        <Map
          setShowPopup={setShowPopup}
          pickUpAddressSelected={pickUpAddressSelected}
          setAddresses={setAddresses}
          addresses={addresses}
        />
      </div>
    </div>
  );
}