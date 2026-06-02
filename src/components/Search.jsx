import { useState } from 'react'
import { api } from '../api'
import Verified from './Verified'

export default function Search({ onView }) {
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])

  const search = async () => {
    if (!q.trim()) return
    setResults(await api.search(q) || [])
  }

  return (
    <div>
      <div className="p-4 border-b border-og-border">
        <input value={q} onChange={e => setQ(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && search()}
               placeholder="Search users..."
               className="w-full bg-og-card border border-og-border rounded-full px-4 py-3 text-og-text focus:outline-none focus:border-og-accent"/>
      </div>
      <div>
        {results.map(u => (
          <div key={u.username} onClick={() => onView({ name: 'profile', username: u.username })}
               className="p-4 border-b border-og-border hover:bg-og-card/30 cursor-pointer flex gap-3">
            <div className="w-12 h-12 rounded-full bg-og-accent flex items-center justify-center font-bold">
              {u.display_name[0].toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{u.display_name}</span>
                {u.verified === 1 && <Verified />}
              </div>
              <div className="text-og-mute">@{u.username}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
