import { useState, useEffect } from 'react'
import { api } from '../api'
import Post from './Post'
import Compose from './Compose'

export default function PostDetail({ postId, me, onView }) {
  const [data, setData] = useState(null)
  
  const load = async () => {
    const result = await api.getPost(postId)
    setData(result)
  }
  
  useEffect(() => { load() }, [postId])
  
  if (!data) return <div className="p-12 text-og-mute text-center">Loading...</div>
  
  return (
    <div>
      <div className="sticky top-0 bg-og-bg/90 backdrop-blur border-b border-og-border z-10 p-4 flex items-center gap-3">
        <button onClick={() => onView({ name: 'feed' })} className="text-og-text hover:bg-og-card rounded-full w-9 h-9 flex items-center justify-center text-xl">
          ←
        </button>
        <div className="font-bold text-xl">Post</div>
      </div>
      
      <Post post={data.post} me={me} onUpdate={load} onView={onView} />
      
      <Compose me={me} replyTo={postId} onPost={load} />
      
      <div>
        {(data.replies || []).length > 0 && (
          <div className="px-4 py-2 text-og-mute text-sm border-b border-og-border">
            {data.replies.length} {data.replies.length === 1 ? 'reply' : 'replies'}
          </div>
        )}
        {(data.replies || []).map(r => (
          <Post key={r.id} post={r} me={me} onUpdate={load} onView={onView} />
        ))}
      </div>
    </div>
  )
}
