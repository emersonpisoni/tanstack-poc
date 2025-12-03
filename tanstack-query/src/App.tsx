import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import ChatRoom from './strict-mode/re-running-effects'
// import { Example } from './example'
// import { StoryTrayApp } from './strict-mode/double-rendering'
// @ts-expect-error: module has no declaration file
import CatFriends from './strict-mode/re-running-ref-callbacks'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {/* <Example /> */}

      {/* <StoryTrayApp /> */}

      {/* <ChatRoom /> */}

      <CatFriends />
    </QueryClientProvider>
  )
}

