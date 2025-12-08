import { Link, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './routes/home'
import UseQueryPage from './routes/use-query'
import SharedCachePage from './routes/shared-cache'
import RefetchPage from './routes/refetch'
import MutationPage from './routes/mutation'

const links = [
  { to: '/', label: '🏠 Home' },
  { to: '/use-query', label: 'useQuery' },
  { to: '/shared-cache', label: 'Shared cache' },
  { to: '/refetch', label: 'Auto Refetch' },
  { to: '/mutation', label: 'useMutation' },
  // { to: '/invalidate', label: 'Invalidation' },
  // { to: '/optimistic', label: 'Optimistic update' },
  // { to: '/prefetch', label: 'Prefetch' },
  // { to: '/pagination', label: 'Pagination' },
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
        </Routes>
      </main>
    </div>
  )
}

