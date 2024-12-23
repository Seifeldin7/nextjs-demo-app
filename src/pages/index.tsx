import { useEffect } from "react";
import { GetServerSidePropsContext } from 'next';
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import { User } from "../interfaces";
import { useRouter } from "next/router";

interface Props {
  user: User
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

export default function App({ user }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      dispatch(login({ user }));
      router.push("/dashboard");
    }
  }, []);

  return null;
}
