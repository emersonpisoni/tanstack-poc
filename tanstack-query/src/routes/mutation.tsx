import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

type CreatePostInput = {
  title: string;
  body: string;
  userId: number;
};

type CreatedPost = CreatePostInput & {
  id: number;
};

export default function MutationPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const mutation = useMutation<CreatedPost, Error, CreatePostInput>({
    mutationFn: async (newPost) => {
      console.log("Creating post...");
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const json = await res.json();
      console.log("Post created!");
      return json;
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({
      title,
      body,
      userId: 1,
    });
  }

  return (
    <div>
      <h2>Creating Data with useMutation</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: 400 }}
      >
        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Post body..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
        />

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Sending..." : "Create Post"}
        </button>
      </form>

      {mutation.isError && (
        <p style={{ color: "red" }}>
          Error: {mutation.error.message}
        </p>
      )}

      {mutation.isSuccess && (
        <div style={{ marginTop: "16px" }}>
          <h4>Post created successfully:</h4>
          <pre style={{ background: "#eee", padding: "12px" }}>
            {JSON.stringify(mutation.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
