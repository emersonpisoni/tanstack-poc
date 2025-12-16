import { Link, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './routes/home'
import UseQueryPage from './routes/use-query'
import SharedCachePage from './routes/shared-cache'
import RefetchPage from './routes/refetch'
import MutationPage from './routes/mutation'
import InvalidatePage from './routes/invalidate-queries'
import OptimisticUpdatePage from './routes/optimistic'
import PrefetchPage from './routes/prefetch'
import PrefetchDetailPage from './routes/prefetch-detail'
import PaginationPage from './routes/pagination'
import InfinitePostsPage from './routes/pagination-infinite'

const links = [
  { to: '/', label: '🏠 Home' },
  { to: '/use-query', label: 'useQuery' },
  { to: '/shared-cache', label: 'Shared cache' },
  { to: '/refetch', label: 'Auto Refetch' },
  { to: '/mutation', label: 'useMutation' },
  { to: '/invalidate-queries', label: 'Invalidation' },
  { to: '/optimistic', label: 'Optimistic update' },
  { to: '/prefetch', label: 'Prefetch' },
  { to: '/pagination', label: 'Pagination' },
  { to: '/pagination-infinite', label: 'Infinite Pagination' },
  // { to: '/persist-cache', label: 'Persistence (concept)' },
]

export default function App() {
  const location = useLocation()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav
        style={{
          width: 260,
          background: '#111827',
          color: 'white',
          padding: '16px',
        }}
      >
        <h1 style={{ marginBottom: 16, fontSize: 18 }}>TanStack Query POC</h1>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {links.map(link => {
            const active = location.pathname === link.to
            return (
              <li key={link.to} style={{ marginBottom: 6 }}>
                <Link
                  to={link.to}
                  style={{
                    display: 'block',
                    padding: '8px 10px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontSize: 14,
                    background: active ? '#1f2937' : 'transparent',
                    color: 'white',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <main style={{ flex: 1, padding: 24 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/use-query" element={<UseQueryPage />} />
          <Route path="/shared-cache" element={<SharedCachePage />} />
          <Route path="/refetch" element={<RefetchPage />} />
          <Route path="/mutation" element={<MutationPage />} />
          <Route path="/invalidate-queries" element={<InvalidatePage />} />
          <Route path="/optimistic" element={<OptimisticUpdatePage />} />
          <Route path="/prefetch" element={<PrefetchPage />} />
          <Route path="/prefetch-detail/:postId" element={<PrefetchDetailPage />} />
          <Route path="/pagination" element={<PaginationPage />} />
          <Route path="/pagination-infinite" element={<InfinitePostsPage />} />
        </Routes>
      </main>
    </div>
  )
}

