import { useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { login } from "../store/slices/userSlice";
import { GetServerSidePropsContext } from 'next'
import { User } from "../interfaces";
import { API_BASE_URL } from '../utils/constants';

interface Props {
  user: User;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.token;

  const user = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

  return {
    props: {
      user,
    },
  };
}

const Home = ({ user }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch(logout());
    router.push("/login");
  }

  useEffect(() => {
    if (user?.email) {
      dispatch(login({ user }));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold mb-6">Home Page</h1>
      {user?.email ? (
        <div className="space-x-4">
          <Link href="/dashboard">
            <span className="text-blue-500 hover:underline">Dashboard</span>
          </Link>

          <Link href="/about">
            <span className="text-blue-500 hover:underline">About</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login">
          <span className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </span>
        </Link>
      )}
    </div>
  );
};

export default Home;
