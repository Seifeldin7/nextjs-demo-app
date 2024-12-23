import { useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { useRouter } from "next/router";
import { getPosts } from "../api-helpers/posts";
import { Post, User } from "../interfaces";
import PostsList  from '../components/posts-list';
import { GetServerSidePropsContext } from 'next'

interface Props {
  posts: Post[];
  user: User;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.token;

  const posts = await getPosts();
  const user = await fetch("http://nodejs-express-app:4000/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

  if (!user?.email) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      posts,
      user
    },
  };
}

export default function Dashboard({ posts, user }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    dispatch(logout());
  }

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome, {user?.email}!</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
      <PostsList posts={posts} />
    </div>
  );
}
