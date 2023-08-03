import { useEffect, useState, useContext } from 'react';
import styles from '../../styles/Items.module.css';
import apiService from '../../utils/api-service';
import Image from 'next/image';
import nextIcon from '../../public/images/next.svg';
import { UserContext } from "../../context/user-context";
import { useRouter } from 'next/router';


export default function Item({ item }) {
  const router = useRouter();
  const [pointA, setPointA] = useState()
  const [pointB, setPointB] = useState()
  const { itemState, setItem } = useContext(UserContext);

  useEffect(() => {
    for (let i = 0; i < item.addresses.length; i++) {
      apiService.getPlacesNames(item.addresses[i].lat, item.addresses[i].lng)
        .then(data => {
          if (i === 0) setPointA(data);
          if (i === 1) setPointB(data);
        });
    }
  }, []);

  function onClickHandler() {
    setItem(item);
    router.replace('/details/details');
  }

  return (
    <div className={styles.item_card}>

      <Image className={styles.btn_details}
        src={nextIcon}
        alt='next button image'
        onClick={() => onClickHandler()}
      />

      <div className={styles.title_description_container}>
        <div><strong>name:</strong> {item.name}</div>
        <p><strong>description:</strong>  {item.description}</p>
      </div>

      <div className={styles.destination_container}>

        <div className={styles.address_holder}>
          <figcaption>Pick up:</figcaption>
          <p>
            {
              pointA?.results[0]?.formatted_address
            }
          </p>
        </div>

        <div className={styles.path_icon}>
          -  -  -  -  -  -  {">"}
        </div>

        <div className={styles.address_holder}>
          <figcaption>drop off:</figcaption>
          <p>
            {
              pointB?.results[0]?.formatted_address
            }
          </p>
        </div>

      </div>

    </div>
  )
}