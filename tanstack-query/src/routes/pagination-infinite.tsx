import { useInfiniteQuery } from "@tanstack/react-query";

type Post = {
  id: number;
  title: string;
};

type PostsResponse = Post[];

async function fetchPosts({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<PostsResponse> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${pageParam}`
  );
  return res.json();
}

export default function InfinitePostsPage() {
  const {
    data,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    staleTime: 10_000,
  });

  if (isPending) return <p>Loading posts...</p>;

  return (
    <div>
      <h2>Infinite Scroll</h2>
      <ul>
        {data?.pages.map((page, pageIndex) =>
          page.map((post) => (
            <li key={`${pageIndex}-${post.id}`}>
              {post.title}
            </li>
          ))
        )}
      </ul>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Load more"
            : "No more posts"}
      </button>
    </div>
  );
}
