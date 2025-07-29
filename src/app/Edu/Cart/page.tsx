'use client'

import React, { useEffect, useState } from 'react';
import styles from './cart.module.css';

export interface Course {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  seats: number;
  semesters: number;
  rating: number;
  price: number;
  type: string;
  imageUrl: string;
}

export default function CartPage() {
  const [cart, setCartCourses] = useState<Course[]>([]);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCartCourses(JSON.parse(cartData));
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>
      {cart.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <ul className={styles.cartList}>
          {cart.map((item) => (
            <li key={item._id} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.title}
              />
              <div className={styles.cartItemDetails}>
                <h2>{item.title}</h2>
                <h3>{item.subtitle}</h3>
                <p>Price: ${item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
