// src/routes/CacheSharedPage.tsx

import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function useTodos() {
  return useQuery<Todo[]>({
    queryKey: ["shared-todos"],
    queryFn: async () => {
      console.log("Fetch started...");
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );
      const data = await res.json();
      console.log("Fetch finished!");
      return data;
    },
    staleTime: 5000,
  });
}

function TodosList() {
  const { data, isPending } = useTodos();

  if (isPending) return <p>Loading todos...</p>;

  return (
    <ul style={{ lineHeight: "28px" }}>
      {data!.map((todo) => (
        <li key={todo.id}>
          #{todo.id} — {todo.title} {todo.completed ? "✔️" : "⏳"}
        </li>
      ))}
    </ul>
  );
}

function TodosSummary() {
  const { data, isFetching } = useTodos();

  if (!data) return null;

  const total = data.length;
  const completed = data.filter((t) => t.completed).length;

  return (
    <p style={{ marginTop: "12px" }}>
      <strong>
        Completed: {completed}/{total}
      </strong>
      {isFetching && " updating..."}
    </p>
  );
}

export default function SharedCachePage() {
  return (
    <div>
      <h2>Shared Cache Between Components</h2>
      <p>
        Both components below use <code>useQuery</code> with the same{" "}
        <code>queryKey</code> (<code>["shared-todos"]</code>), which means they
        share:
      </p>

      <ul>
        <li>One single network request</li>
        <li>The same cached data</li>
        <li>The same loading/fetching state</li>
      </ul>

      <h3>Todo List</h3>
      <TodosList />

      <h3>Summary</h3>
      <TodosSummary />
    </div>
  );
}
