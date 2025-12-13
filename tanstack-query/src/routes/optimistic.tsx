import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return res.json();
}

export default function OptimisticUpdatePage() {
  const queryClient = useQueryClient();

  const todosQuery = useQuery<Todo[]>({
    queryKey: ["optimistic-todos"],
    queryFn: fetchTodos,
  });

  const toggleTodoMutation = useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !todo.completed }),
        }
      );
      if (!res.ok) throw new Error("Server error");
      return res.json();
    },
    onMutate: async (todo) => {
      await queryClient.cancelQueries({ queryKey: ["optimistic-todos"] });

      const previousTodos =
        queryClient.getQueryData<Todo[]>(["optimistic-todos"]);

      queryClient.setQueryData<Todo[]>(
        ["optimistic-todos"],
        (old) =>
          old?.map((t) =>
            t.id === todo.id
              ? { ...t, completed: !t.completed }
              : t
          ) ?? []
      );

      return { previousTodos };
    },
    onError: (_error, _todo, onMutateResult) => {
      if (onMutateResult?.previousTodos) {
        queryClient.setQueryData(
          ["optimistic-todos"],
          onMutateResult.previousTodos
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["optimistic-todos"] });
    },
  });

  if (todosQuery.isPending) return <p>Loading todos...</p>;

  return (
    <div>
      <h2>Optimistic Updates</h2>
      <ul>
        {todosQuery.data!.map((todo) => (
          <li key={todo.id}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoMutation.mutate(todo)}
              />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
