'use client';

import login from './log.module.css';

export default function Login() {
  return (
    <div className={login.login}>
      <h2>Log In</h2>
      <form>
        <input type="email" placeholder="Email *" required />
        <input type="password" placeholder="Password *" required />
        <button type="submit" className={login.login_btn}>Log In</button>
      </form>

      <div className={login.or}>or log in with</div>
      <div className={login.social_login}>
        <button>Google</button>
        <button>Facebook</button>
      </div>

      <div className={login.signup_link}>
        Don't have an account? <a href="#">Sign up</a>
      </div>
    </div>
  );
}
