"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const { email, password } = userInfo;

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) return setError(res.error);
    router.replace("/");
  };

  return (
    <section className="login">
      <div className="container login__wrap">
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="form_field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address.."
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password!"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-first">
            Login
          </button>

          <span className="warning">{error && error}</span>
        </form>

        <div className="cred__footer">
          <p>
            <Link href="/auth/forget-password">Forget password?</Link>
          </p>

          <br />

          <span>
            Haven't registered? <Link href="/auth/register">Create one</Link>
          </span>
        </div>
      </div>
    </section>
  );
}
