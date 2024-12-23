import { Post } from "../interfaces";

interface Props {
    posts: Post[]
}

const PostsList = ({ posts }: Props) => (
  <div className="mt-8 w-full max-w-2xl">
    <h2 className="text-2xl font-bold mb-4">Posts</h2>
    <ul>
      {posts?.map((post) => (
        <li key={post.id} className="mb-2">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p>{post?.content}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default PostsList;
