import { useState, useEffect } from 'react'
import { api } from '../api'
import Post from './Post'
import Verified from './Verified'

export default function Profile({ username, me, onView }) {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  const load = async () => {
    const data = await api.getUser(username)
    setUser(data.user)
    setPosts(data.posts || [])
  }
  useEffect(() => { load() }, [username])

  if (!user) return <div className="p-12 text-og-mute text-center">Loading...</div>

  const toggleFollow = async () => {
    if (user.is_following) await api.unfollow(username)
    else await api.follow(username)
    load()
  }

  return (
    <div>
      <div className="h-32 bg-gradient-to-br from-og-accent/30 to-og-card"/>
      <div className="p-4 -mt-12">
        <div className="flex justify-between items-start mb-3">
          <div className="w-20 h-20 rounded-full bg-og-accent border-4 border-og-bg flex items-center justify-center text-3xl font-bold">
            {user.display_name[0].toUpperCase()}
          </div>
          {user.username !== me.username && (
            <button onClick={toggleFollow}
                    className={`px-5 py-1.5 rounded-full font-bold mt-12 ${user.is_following ? 'bg-transparent border border-og-border text-og-text' : 'bg-og-text text-og-bg'}`}>
              {user.is_following ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <h1 className="text-xl font-bold">{user.display_name}</h1>
          {user.verified === 1 && <Verified size={20}/>}
        </div>
        <div className="text-og-mute mb-3">@{user.username}</div>
        {user.bio && <div className="text-og-text mb-3">{user.bio}</div>}
        <div className="flex gap-4 text-sm text-og-mute">
          <div><span className="text-og-text font-bold">{user.following_count}</span> Following</div>
          <div><span className="text-og-text font-bold">{user.followers_count}</span> Followers</div>
        </div>
      </div>
      <div className="border-t border-og-border">
        {posts.map(p => <Post key={p.id} post={p} me={me} onUpdate={load} onView={onView} />)}
        {posts.length === 0 && <div className="p-12 text-center text-og-mute">No posts yet.</div>}
      </div>
    </div>
  )
}
