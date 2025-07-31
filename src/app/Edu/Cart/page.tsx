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

  const handleDelete = (course: Course) => {
    const updatedCart = cart.filter(item => item._id !== course._id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartCourses(updatedCart);
  };

  const totalPrice=cart.reduce((total,item)=>total+item.price,0);

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
              <i
                className="fa-solid fa-xmark"
                onClick={() => handleDelete(item)}
                style={{ cursor: 'pointer' }}
              ></i>
            </li>
          ))}
          <h2>Total Price : ${totalPrice}</h2>
        </ul>
      )}
    </div>
  );
}
