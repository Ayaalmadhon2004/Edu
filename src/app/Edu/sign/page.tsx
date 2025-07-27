'use client';

import { useState } from 'react';
import sign from './sign.module.css';

export default function Page() {
  const[form,setForm]=useState({
    fullname:"",
    phone:"",
    email:"",
    password:"",
  });

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const res=await fetch('/api/signup',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(form),
    });
    const data=await res.json();
    alert (data.message);

  }



  return (
    <div className={sign.sign_up}>
      <h2>Sign Up</h2>
       <form onSubmit={handleSubmit}>
        <input type="text" name="fullname" placeholder="Full Name *" required onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone *" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email *" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password *" required onChange={handleChange} />
        <button type="submit" className={sign.signup_btn}>Sign Up</button>
      </form>

      <div className={sign.or}>or sign up with</div>
      <div className={sign.social_signup}>
        <button>Google</button>
        <button>Facebook</button>
      </div>

      <div className={sign.signin_link}>
        Already Have an Account? <a href="#">Sign in</a>
      </div>
    </div>
  );
}
