import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
};

export default function InvalidatePage() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      console.log("Fetching posts...");
      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
      return res.json();
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (title: string) => {
      console.log("Creating post...");
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      return res.json();
    },
    onSuccess: () => {
      console.log("Post created! Invalidating posts...");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const [title, setTitle] = useState("");

  return (
    <div>
      <h2>Invalidating Queries</h2>

      <h3>Posts List</h3>

      {postsQuery.isPending && <p>Loading posts...</p>}

      {postsQuery.data && (
        <ul>
          {postsQuery.data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}

      {postsQuery.isFetching && <p>Refreshing posts...</p>}

      <h3>Create Post</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPostMutation.mutate(title);
          setTitle("");
        }}
        style={{ marginBottom: "16px" }}
      >
        <input
          type="text"
          placeholder="New post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit" disabled={createPostMutation.isPending}>
          {createPostMutation.isPending ? "Creating..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}
