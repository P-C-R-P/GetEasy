import { useContext, React } from 'react';
import { UserContext } from '../../context/user-context';
import styles from '../../styles/Details.module.css';
import Map from '../map/map';
import Image from 'next/image';
import nextIcon from '../../public/images/next.svg';
import { useRouter } from 'next/navigation';

export default function Details () {
  const { itemState } = useContext(UserContext);
  const router = useRouter();

  return (
    <div className={styles.details_main_container}>
      <Image
        className={styles.btn_back}
        src={nextIcon}
        onClick={() => router.push('/')}
        alt="image back button"
      />

      <div className={styles.details_container}>
        <button className={styles.btn_offer}>Make offer</button>
        <div className={styles.item_params}>
          <div className={styles.item_details}>
            <div className={styles.details_name}>
              <h2 className={styles.item_tag}>Name: </h2>
              <h2 className={styles.item_text}>{itemState.name}</h2>
            </div>
            <div className={styles.details_description}>
              <h2 className={styles.item_tag}>Description: </h2>
              <h2 className={styles.item_text}>{itemState.description}</h2>
            </div>
            <div className={styles.details_weight}>
              <h2 className={styles.item_tag}>Weight: </h2>
              <h2 className={styles.item_text}>
                {itemState.weight} {itemState.weightMeasurement}
              </h2>
            </div>
            {itemState.addresses[0].pickUp && (
              <div>
                <h2>Pick up: </h2>
                <h2>{itemState.addresses[0].pickUp}</h2>
                <h2>Drop off: </h2>
                <h2>{itemState.addresses[0].dropOff}</h2>
              </div>
            )}
          </div>
        </div>
        {itemState.addresses[0].lat && (
          <div className={styles.map_container}>
            <Map
              a={{
                lat: itemState.addresses[0].lat,
                lng: itemState.addresses[0].lng
              }}
              b={{
                lat: itemState.addresses[1].lat,
                lng: itemState.addresses[1].lng
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
