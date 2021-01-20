import React, { useEffect, useState } from 'react';
import './App.css';
import ItemCount from '../ItemCount/ItemCount';
import { formatItemPrice } from '../../utils/helpers';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/cart`,
      {
        method: "GET"
      })
      .then(res => res.json())
      .then((res) => {
        const items = res.map(item => ({
          ...item,
          quantity: item.min
        }))

        setItems(items);
      })
  }, [])

  const getTotal = () => {
    let total = 0;
    items.forEach(item => {
      total = total + (parseFloat(item.price * item.quantity));
    });

    return formatItemPrice(total.toFixed(2));
  }

  const addItem = (pid) => {
    const updatedItems = items.map(item => item.pid === pid ? { ...item, quantity: item.quantity + 1 } : item);

    setItems(updatedItems);
  }

  const removeItem = (pid) => {
    const updatedItems = items.map(item => item.pid === pid ? { ...item, quantity: item.quantity - 1 } : item);

    setItems(updatedItems);
  }

  const resetItem = (pid) => {
    const updatedItems = items.map(item => item.pid === pid ? { ...item, quantity: item.min } : item);

    setItems(updatedItems);
  }

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <ul>
        {items.map(item => (
          <li key={item.pid} className="row">
            <div className="item">{item.name}, cena: {formatItemPrice(item.price)}zł</div>
            <ItemCount pid={item.pid} quantity={item.quantity} add={addItem} remove={removeItem} reset={resetItem} min={item.min} max={item.max} isBlocked={item.isBlocked} />
          </li>
        ))}
      </ul>
      <span className="totalValue">Suma: {getTotal()} zł</span>
    </div>
  );
};

export {
  App
};
