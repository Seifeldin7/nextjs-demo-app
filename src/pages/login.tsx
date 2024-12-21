import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { showNotification } from '../store/slices/notificationSlice';

export default function Login() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleSubmit(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    setError("");


    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/");
      dispatch(showNotification({ message: 'Login successful', type: 'success' }));
    } else {
      setError(data.error || "Login failed");
      dispatch(showNotification({ message: data.error || 'Login failed', type: 'error' }));
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form action={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
