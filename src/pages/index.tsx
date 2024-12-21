import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import Home from "./home";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  const user = await fetch("http://localhost:4000/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

  if (!user) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}

export default function App({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(login({ user }));
    }
  }, []);

  return <Home />;
}
