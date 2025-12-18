/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query"
import type { Post } from "./fetch-in-useeffect"

async function fetchPosts(): Promise<Post[]> {
  return fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch')
    }
    return res.json()
  })
}

export function BookmarksQuery() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: fetchPosts
  })

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}