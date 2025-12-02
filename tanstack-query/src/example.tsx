import { useQuery } from "@tanstack/react-query"

async function fetchTodoList() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=10',
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return response.json()
}

// useQuery always need a unique queryKey and a queryFn to fetch data
// isPending = The query has no data yet
// isError = The query encountered an error
// data = The resolved data from the queryFn
// error = The error thrown from the queryFn
// isSuccess = The query was successful and has data
// isFetching = The query is currently fetching (can be true even if data exists because of background refetching)

export function Example() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <ul>
      {data.map((todo: { id: number; title: string }) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
