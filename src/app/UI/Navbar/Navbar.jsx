import Nav from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
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
                <Link href="/teachers">teachers</Link>
            </li>
            <li>
                <Link href="/courses">Courses</Link>
            </li>
            <li>
                <Link href="/about">About</Link>
            </li>
            <li>
                <Link href="/contact">Contact</Link>
            </li>
        </ul>
    </div>
  )
}
