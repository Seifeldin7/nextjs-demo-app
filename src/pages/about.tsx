import { getPosts } from "../api-helpers/posts";
import { Post } from "../interfaces";
import PostsList from "../components/posts-list";

interface Props {
  posts: Post[];
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default function About({ posts }: Props) {
  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <PostsList posts={posts} />
    </div>
  );
}
