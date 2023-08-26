import React, { useEffect, useState } from 'react';
import apiService from '../../utils/api-service';
import Item from './item';
import styles from '../../styles/Items.module.css';

export default function Items({ isOwnItems }) {
  const [items, setItems] = useState([]);
  let user;

  useEffect(() => {
    user = JSON.parse(localStorage.getItem('user'));
    if (isOwnItems)
      apiService.getOwnItems(user.id).then((data) => setItems(data));
    else apiService.getAllItems().then((data) => setItems(data));
  }, [isOwnItems]);

  const itemsHTML =
    items.length > 0 ? (
      items.map((item, indx) => <Item key={indx} item={item} />)
    ) : (
      <div className="no-items">
        <p>Currently there are no items to display.</p>
        <p>Click on 'Create Item' to get started.</p>
      </div>
    );

  return <div className={styles.items_container}>{itemsHTML}</div>;
}
