import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user-context";
import styles from '../../styles/Details.module.css';
import Map from '../map/map';
import Image from 'next/image';
import nextIcon from '../../public/images/next.svg';
import { useRouter } from 'next/navigation'

export default function Details() {
  const { itemState } = useContext(UserContext);
  const router = useRouter()

  return (
    <div className={styles.details_main_container}>

      <Image
        className={styles.btn_back}
        src={nextIcon}
        onClick={() => router.push('/')}
        alt="image back button"
      />

      <div className={styles.details_container}>
        <button className={styles.btn_offer}>make offer</button>
        <div className={styles.item_params}>
          <h1>{itemState.name}</h1>
          <p>{itemState.description}</p>
          <i>{itemState.weight}</i>
        </div>
        <div className={styles.map_container}>
          {itemState.addresses &&
            <Map
              a={{ lat: itemState.addresses[0].lat, lng: itemState.addresses[0].lng }}
              b={{ lat: itemState.addresses[1].lat, lng: itemState.addresses[1].lng }}
            />
          }
        </div>
      </div>
    </div>
  )
}