import React, { useEffect, useState, useRef } from 'react';

const ItemCount = ({ quantity, min, max, pid, add, remove, reset, isBlocked }) => {

  const [error, setError] = useState(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!isFirstRun.current) {
      fetch(`/api/product/check`,
        {
          method: "POST",
          body: JSON.stringify({ pid, quantity })
        })
        .then(res => res.json())
        .then((res) => {
          if (res.isError) {
            setError(res);
          }
        })
    }
  }, [quantity])

  useEffect(() => {
    isFirstRun.current = false;
  }, []);

  useEffect(() => {
    if (error && error.isError) {
      reset(pid)
    }
  }, [error])

  return (
    <div>
      <button onClick={quantity < max && (() => add(pid))} disabled={isBlocked}>+</button>
      <span className="quantity">Obecnie masz {quantity} sztuk produktu</span>
      <button onClick={quantity > min && (() => remove(pid))} disabled={isBlocked}>-</button>
    </div>
  )
}

export default ItemCount;