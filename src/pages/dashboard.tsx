import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { useRouter } from "next/router";


export default function Dashboard() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push("/login");
    dispatch(logout());
  }

  return (
    <>
      <h1>Welcome, {user?.email}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
