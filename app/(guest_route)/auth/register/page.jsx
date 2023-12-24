"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const { name, email, password } = userInfo;

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    setBusy(true);
    e.preventDefault();
    const res = await fetch("/api/auth/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }).then((res) => res.json());
    console.log(res);
    setBusy(false);

    if (res?.error) return setError(res.error);

    router.replace("/auth/login");
  };

  return (
    <section className="register">
      <div className="container register__wrap">
        <form className="register_form" onSubmit={handleSubmit}>
          <div className="form_field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name.."
              value={name}
              onChange={handleChange}
              required
            />
          </div>
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
          <button
            type="submit"
            className="btn btn-first"
            disabled={busy}
            style={{ opacity: busy ? 0.5 : 1 }}
          >
            Register
          </button>

          <span className="warning">{error && error}</span>
        </form>

        <div className="cred__footer">
          <span>
            Already registered? <Link href="/auth/login">Login</Link>
          </span>
        </div>
      </div>
    </section>
  );
}
