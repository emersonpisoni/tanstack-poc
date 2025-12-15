/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react"

export function Bookmarks({ category }: { category: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    let ignore = false

    async function fetchData() {
      setIsLoading(true)
      try {
        const res = await fetch(`${'endpoint'}/${category}`)
        if (!res.ok) {
          throw new Error('Failed to fetch')
        }
        const data = await res.json()
        if (!ignore) {
          setData(data)
          setError(undefined)
        }
      } catch (e) {
        if (!ignore) {
          setError(e)
          setData(undefined)
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
  }, [category])

  // Return JSX based on data and error state
}