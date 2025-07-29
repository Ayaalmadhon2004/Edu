'use client';

import { useRouter } from "next/navigation";
import Nav from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter();
  return (
    <div className={Nav.navbar}>
        <div className={Nav.logo}>
            <h2>EduPath</h2>
        </div>
        <ul className={Nav.list}>
            <li>
                <Link href="/">Header</Link>
            </li>
            <li>
                <Link href="/Edu/teachers">teachers</Link>
            </li>
            <li>
                <Link href="/Edu/courses">Courses</Link>
            </li>
            <li>
                <Link href="/Edu/about">About</Link>
            </li>
            <li>
                <Link href="/Edu/contact">Contact</Link>
            </li>
        </ul>
        <div className={Nav.sign_log}>
            <button type="submit" onClick={() => router.push('/Edu/sign')}>Sign Up</button>
            <button type="submit" onClick={() => router.push('/Edu/log')}>Log in</button>
            <button type="submit" onClick={() => router.push('/Edu/Cart')}><i className="fa-solid fa-cart-shopping"></i></button>
        </div>
    </div>
  )
}
