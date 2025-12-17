/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react"

export interface Post {
  id: number
  title: string
}

export function Bookmarks() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<Post[]>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let ignore = false

    async function fetchData() {
      setIsLoading(true)
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) {
          throw new Error('Failed to fetch')
        }
        const json = (await res.json()) as Post[]
        if (!ignore) {
          setData(json)
          setError(null)
        }
      } catch (e) {
        if (!ignore) {
          setError(e as Error)
          setData([])
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    fetchData()
    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}