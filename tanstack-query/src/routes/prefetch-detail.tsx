import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type Post = {
  id: number;
  title: string;
  body: string;
};

async function fetchPostById(id: number): Promise<Post> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return res.json();
}

export default function PrefetchDetailPage() {
  const { postId } = useParams<{ postId: string }>();

  const postQuery = useQuery<Post>({
    queryKey: ["post", Number(postId)],
    queryFn: () => fetchPostById(Number(postId)),
    staleTime: 10_000,
  });

  if (postQuery.isPending) return <p>Loading post...</p>;

  return (
    <div>
      <h3>{postQuery.data!.title}</h3>
      <p>{postQuery.data!.body}</p>
    </div>
  );
}
