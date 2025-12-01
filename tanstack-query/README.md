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

- Learning curve
- Incorrect use of caches
- UI State
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

## Examples

### Covered by POC

[x] - Simple comparision between fetch-in-useeffect and tanstack query
[ ] - Queries
[ ] - Query Keys
[ ] - Query Functions
[ ] - Query Options
[ ] - Network Mode
[ ] - Parallel Queries
[ ] - Dependent Queries