# Tanstack Query

### Powerful asynchronous state management, server-state utilities and data fetching

## Maintainer - Dominik Dorfmeister
Blog - https://tkdodo.eu/blog/practical-react-query

### [Why you need Tanstack Query?](https://tkdodo.eu/blog/why-you-want-react-query)

Using fetch-in-useEffect way can include problems with:

- Race condition
- Loading state
- Empty state
- Data and Error reset
- StrictMode will fire twice

### [Why you might not need Tanstack Query?](https://tkdodo.eu/blog/you-might-not-need-react-query)

- If you are using server components and server actions

## Trade-offs

### Pros

- Server State
- Less sync bugs

### Cons

- Increase bundle size

## [Similar solutions](https://tanstack.com/query/latest/docs/framework/react/comparison)

- SWR
- Apollo Client
- RTK-Query
- React Router

## [Thinking in Tanstack Query](https://tkdodo.eu/blog/thinking-in-react-query) 😕

1 - It is NOT a data fetching library
  - It is a State Manager
  - It is an async state manager

2 - staleTime is you best friend
  - It is default 0ms
  - Define a staleTime that is great for your scenario

3 - Treat Parameters as Dependencies
  - parameters are dependencies

### Kind of states

#### Client State

- Owned completely
- Synchronously available
- Always up-to-date

#### Server State

- Persisted remotely
- Asynchronously available
- Potentially out-of-date

## [Setup](https://tanstack.com/query/latest/docs/framework/react/installation)

### Create project with Tanstack Query

`npm create vite@latest poc-tanstack --template react-ts`

`npm i -D @tanstack/eslint-plugin-query`

`npm i @tanstack/react-query-devtools`

## Core comcepts

- Queries
- Mutations
- Query invalidation

### Queries

Most simple example of a Query:

```js
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })

```

- `staleTime` is how much time de data is fresh.
  - if 0, the data is always stale, that means it always will be refetched.
  - If > 0, the data will be fresh during this time. after, will be stale again.
  - if `Inifinity` the data will always use the cache.

### Auto refresh

- Auto Refresh occurs when
  - staleTime expires
  - Component remounts
  - calling `refetch` manually
  - other ways like window focus, reconnection, interval

### Shared cache

- Components with the same queryKey:
  - Share the same data, state and cache
  - Fire just 1 request

### Mutations

Most simple useMutation inplementation
```js
const mutation = useMutation({
  mutationFn: async (input) => { ... }
})
```

And this is how you mutate something:
```js
mutation.mutate(input)
```

- You need to invalidate queries to update correctly the data after the mutations

## Examples

### Covered by POC

[x] - Simple comparision between fetch-in-useeffect and tanstack query

[x] - Status queries result (isPending, isError...)

[x] - useQuery

[x] - Shared cache

[x] - Auto refetch

[x] - Mutation

## Questions

### [What is StrictMode?](https://react.dev/reference/react/StrictMode)

Use StrictMode to enable additional development behaviors and warnings for the component tree.

- Your components will re-render an extra time to find bugs caused by impure rendering.
- Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.
- Your components will re-run refs callbacks an extra time to find bugs caused by missing ref cleanup.
- Your components will be checked for usage of deprecated APIs.

React assumes that every component you write is a pure function. This means that React components you write must always return the same JSX given the same inputs (props, state, and context).