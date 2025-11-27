# Tanstack Query

### Powerful asynchronous state management, server-state utilities and data fetching

### [Why you need Tanstack Query?](https://tkdodo.eu/blog/why-you-want-react-query)

Using fetch-in-useEffect way can include problems with:

- Race condition
- Loading state
- Empty state
- Data and Error reset
- StrictMode will fire twice

### [Why you might not need Tanstack Query?](https://tkdodo.eu/blog/you-might-not-need-react-query)

- If you are using server components and server actions

## Maintainer - Dominik Dorfmeister
Blog - https://tkdodo.eu/blog/practical-react-query

## Trade-offs

### Pros

- Server State
- Less sync bugs

### Cons

- Learning curve
- Incorrect use of caches
- UI State
- Increase bundle size

## Setup

### Create project with Tanstack Query

`npm create vite@latest poc-tanstack --template react-ts`

`npm i -D @tanstack/eslint-plugin-query`

## Core comcepts

- Queries
- Mutations
- Query invalidation

