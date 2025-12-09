import { useQuery } from '@tanstack/react-query'

type Repo = {
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  subscribers_count: number
}

export default function UseQueryPage() {
  const { data, isPending, error, isFetching, refetch, dataUpdatedAt, isLoading } = useQuery<Repo>({
    queryKey: ['repoData'],
    queryFn: async () => {
      console.log("Fetch started...");
      await new Promise(r => setTimeout(r, 2000));
      console.log("Fetch finished!");
      const res = await fetch('https://api.github.com/repos/TanStack/query')
      if (!res.ok) throw new Error('Error to fetch repo data')
      return res.json()
    },
    staleTime: 5000,
  })

  console.log({ isLoading, isPending, isFetching });

  return (
    <div>
      <h2>useQuery – fetch + cache</h2>
      <p>
        First example: fetching data using <code>useQuery</code> with loading, error, success states and background refetch.
      </p>

      {isPending && <p>Loading...</p>}
      {error instanceof Error && <p>Erro: {error.message}</p>}

      <button onClick={() => refetch()}>Manual Refetch</button>

      <p>
        Last updated at:
        {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : '—'}
      </p>
      <p>isFetching: {isFetching ? 'true (getting...)' : 'false'}</p>


      {data && (
        <div style={{ marginTop: 12 }}>
          <h3>{data.full_name}</h3>
          <p>{data.description}</p>
          <p>
            {data.stargazers_count} | 🍴 {data.forks_count} | 👀{' '}
            {data.subscribers_count}
          </p>
          {isFetching && <p>Updating in background</p>}
        </div>
      )}
    </div>
  )
}