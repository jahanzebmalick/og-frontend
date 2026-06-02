import { useState, useEffect } from 'react'
import { api } from '../api'
import Post from './Post'
import Compose from './Compose'

export default function Feed({ me, onView }) {
  const [tab, setTab] = useState('feed')
  const [posts, setPosts] = useState([])

  const load = async () => {
    const data = tab === 'feed' ? await api.feed() : await api.explore()
    setPosts(data || [])
  }

  useEffect(() => { load() }, [tab])

  return (
    <div>
      <div className="sticky top-0 bg-og-bg/80 backdrop-blur border-b border-og-border z-10">
        <div className="px-4 py-3 font-bold text-xl">Home</div>
        <div className="flex border-b border-og-border">
          <Tab active={tab === 'feed'} onClick={() => setTab('feed')}>Following</Tab>
          <Tab active={tab === 'explore'} onClick={() => setTab('explore')}>Explore</Tab>
        </div>
      </div>

      <Compose me={me} onPost={load} />

      <div>
        {posts.map(p => <Post key={p.id} post={p} me={me} onUpdate={load} onView={onView} />)}
        {posts.length === 0 && (
          <div className="p-12 text-center text-og-mute">
            {tab === 'feed' ? 'Follow people to see their posts here.' : 'No posts yet. Be the first!'}
          </div>
        )}
      </div>
    </div>
  )
}

function Tab({ active, onClick, children }) {
  return (
    <button onClick={onClick}
            className={`flex-1 py-4 font-semibold border-b-2 transition ${active ? 'border-og-accent text-og-text' : 'border-transparent text-og-mute hover:bg-og-card'}`}>
      {children}
    </button>
  )
}
