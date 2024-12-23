import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getPosts } from "../api-helpers/posts";
import { Post } from "../interfaces";
import { RootState } from "../store";

interface Props {
  posts: Post[];
}

export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default function Dashboard({ posts }: Props) {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    dispatch(logout());
  }

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

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
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-2">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p>{post?.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
