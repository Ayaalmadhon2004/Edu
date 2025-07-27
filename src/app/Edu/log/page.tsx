'use client';

import { useState } from 'react';
import login from './log.module.css';
import { useRouter } from 'next/navigation'; // ✅ التصحيح هنا

export default function Login() {
  const router = useRouter(); // استخدام التوجيه في App Router

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Login successful! Welcome ' + data.fullname);
        router.push('/'); // ✅ توجيه المستخدم بعد تسجيل الدخول
      } else {
        alert('Login failed: ' + data.message); // ✅ تستقبل الرسالة من API
      }

    } catch (error) {
      alert('Server error: ' + error.message);
    }
  };

  return (
    <div className={login.login}>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password *"
          required
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" className={login.login_btn}>Log In</button>
      </form>

      <div className={login.or}>or log in with</div>
      <div className={login.social_login}>
        <button>Google</button>
        <button>Facebook</button>
      </div>

      <div className={login.signup_link}>
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}
