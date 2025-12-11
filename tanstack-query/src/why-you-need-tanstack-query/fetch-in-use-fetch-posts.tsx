import { useEffect, useState } from "react";
import type { Post } from "./fetch-in-useeffect";

function usePosts() {
  const [data, setData] = useState<Post[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}



export function PostsPage() {
  const { data, loading } = usePosts();

  if (loading) return <p>Loading...</p>;
  return <ul>{data.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
