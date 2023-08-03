import PostItem from '../post-item/post-item';
import Navbar from '../navbar/navbar';
import Items from '../items/items';
import React, { useState } from 'react';
import styles from '../../styles/Dashboard.module.css';

export default function Dashboard() {

  const [isCreateItem, setIsCreateItem] = useState(false);
  const [isOwnItem, setIsOwnItem] = useState(false);

  return (
    <div className={styles.dashboard_container}>
      <Navbar
        setIsOwnItem={setIsOwnItem}
        isOwnItem={isOwnItem}
        setIsCreateItem={setIsCreateItem}
      />
      {
        !isCreateItem ? 
          <Items isOwnItems={isOwnItem} />
          :
          <PostItem setIsCreateItem={setIsCreateItem} />
      }
    </div>
  )
}