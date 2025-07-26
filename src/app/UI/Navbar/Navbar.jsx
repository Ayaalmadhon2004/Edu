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
            <button type="submit"><Link href="Edu/sign">Sign up</Link></button>
            <button type="submit"><Link href="Edu/log">Log in</Link></button>
        </div>
    </div>
  )
}
