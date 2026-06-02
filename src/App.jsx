import { useState, useEffect } from 'react'
import { api } from './api'
import Auth from './components/Auth'
import Layout from './components/Layout'

export default function App() {
  const [me, setMe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.me().then(setMe).catch(() => setMe(null)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-og-mute">Loading...</div>
  if (!me) return <Auth onLogin={setMe} />
  return <Layout me={me} setMe={setMe} />
}
