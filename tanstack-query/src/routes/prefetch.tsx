import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  title: string;
};

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  return res.json();
}

async function fetchPostById(id: number): Promise<Post> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return res.json();
}

export default function PrefetchPage() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 10_000,
  });

  function prefetchPost(postId: number) {
    queryClient.prefetchQuery({
      queryKey: ["post", postId],
      queryFn: () => fetchPostById(postId),
      staleTime: 10_000,
    });
  }

  if (postsQuery.isPending) return <p>Loading posts...</p>;

  return (
    <div>
      <h2>Prefetching Data</h2>

      <ul>
        {postsQuery.data!.map((post) => (
          <li key={post.id}>
            <Link
              to={`/prefetch-detail/${post.id}`}
              onMouseEnter={() => prefetchPost(post.id)}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
