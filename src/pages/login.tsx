import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showNotification } from "../store/slices/notificationSlice";

export default function Login() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  // eslint-disable-next-line
  async function handleSubmit(formData: any) {
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
      dispatch(
        showNotification({ message: "Login successful", type: "success" })
      );
    } else {
      setError(data.error || "Login failed");
      dispatch(
        showNotification({
          message: data.error || "Login failed",
          type: "error",
        })
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <form
        action={handleSubmit}
        className="bg-white text-black p-8 rounded shadow-md w-full max-w-sm"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
