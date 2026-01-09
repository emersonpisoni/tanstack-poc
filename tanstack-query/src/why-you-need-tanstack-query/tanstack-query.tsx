/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

async function createBookmark(payload: Pick<Post, "title" | "body" | "userId">) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create");
  return res.json() as Promise<Post>;
}

export function BookmarksQuery() {
  const queryClient = useQueryClient();

  const { isLoading, data, error, isFetching } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: createBookmark,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          onClick={() =>
            mutation.mutate({
              userId: 1,
              title: "New bookmark",
              body: "Content of the new bookmark",
            })
          }
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Create bookmark (mutation)"}
        </button>

        {isFetching ? "Updating list (refetch)..." : "List updated"}
      </div>

      {mutation.isError && mutation.error instanceof Error && (
        <p style={{ color: "crimson" }}>Mutation error: {mutation.error.message}</p>
      )}

      {mutation.isSuccess && (
        <p style={{ color: "green" }}>
          Mutation OK. Cache invalidated → refetch done.
        </p>
      )}

      <ul>
        {data?.slice(0, 10).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}