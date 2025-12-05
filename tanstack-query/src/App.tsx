import { Link, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './routes/home'
import UseQueryPage from './routes/use-query'

const links = [
  { to: '/', label: '🏠 Início' },
  { to: '/use-query', label: '1️⃣ useQuery' },
  // { to: '/cache-shared', label: '2️⃣ Cache compartilhado' },
  // { to: '/refetch', label: '3️⃣ Refetch automático' },
  // { to: '/mutation', label: '4️⃣ useMutation' },
  // { to: '/invalidate', label: '5️⃣ Invalidação' },
  // { to: '/optimistic', label: '6️⃣ Optimistic update' },
  // { to: '/prefetch', label: '7️⃣ Prefetch' },
  // { to: '/pagination', label: '8️⃣ Paginação' },
  // { to: '/persist-cache', label: '9️⃣ Persistência (conceito)' },
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
        </Routes>
      </main>
    </div>
  )
}

