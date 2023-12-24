"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="header">
      <nav className="navbar nav__grid">
        <Link href="/" className="nav__logo">
          Blog.
        </Link>

        <ul className="nav__menu">
          <li className="nav__item">
            <Link href="/about">About</Link>
          </li>
          <li className="nav__item">
            <Link href="/blog">Blog</Link>
          </li>
          <li className="nav__item">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <div className="nav__left">
          {!session && (
            <>
              <Link href="/auth/login" className="btn btn-next">
                Login
              </Link>
              <Link href="/auth/register" className="btn btn-first">
                Register
              </Link>
            </>
          )}

          {session?.user && (
            <>
              <span className="user__name">{session.user.name}</span>
              <button onClick={() => signOut()} className="btn btn-first">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
