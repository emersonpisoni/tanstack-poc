import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
};

async function fetchPosts(page: number): Promise<Post[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
  );
  return res.json();
}

export default function PaginationPage() {
  const [page, setPage] = useState(1);

  const postsQuery = useQuery<Post[]>({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    staleTime: 10_000,
    placeholderData: (previousData) => previousData,
  });

  return (
    <div>
      <h2>Pagination</h2>
      {postsQuery.isPending && <p>Loading posts...</p>}
      <ul>
        {postsQuery.data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      {postsQuery.isFetching && <p>Fetching new page...</p>}
      <div style={{ marginTop: "12px" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 12px" }}>
          Page {page}
        </span>
        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
