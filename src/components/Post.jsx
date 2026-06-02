import { api } from '../api'
import Verified from './Verified'

export default function Post({ post, me, onUpdate, onView }) {
  const toggle = async () => { await api.likePost(post.id); onUpdate() }
  const del = async () => {
    if (confirm('Delete this post?')) { await api.deletePost(post.id); onUpdate() }
  }

  return (
    <div className="p-4 border-b border-og-border hover:bg-og-card/30 transition cursor-pointer">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-og-accent flex-shrink-0 flex items-center justify-center font-bold">
          {post.owner_display_name?.[0]?.toUpperCase() || post.owner[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1" onClick={(e) => { e.stopPropagation(); onView({ name: 'profile', username: post.owner })}}>
            <span className="font-bold hover:underline">{post.owner_display_name || post.owner}</span>
            {post.owner_verified === 1 && <Verified />}
            <span className="text-og-mute">@{post.owner}</span>
            <span className="text-og-mute">·</span>
            <span className="text-og-mute text-sm">{new Date(post.created_at).toLocaleString()}</span>
          </div>
          <div className="text-og-text whitespace-pre-wrap mb-3">{post.text}</div>
          <div className="flex items-center gap-6 text-og-mute">
            <button onClick={(e) => { e.stopPropagation(); toggle() }}
                    className={`hover:text-og-accent transition flex items-center gap-2 ${post.liked ? 'text-og-accent' : ''}`}>
              {post.liked ? '❤️' : '🤍'} {post.likes > 0 && post.likes}
            </button>
            {post.owner === me.username && (
              <button onClick={(e) => { e.stopPropagation(); del() }} className="hover:text-red-500 transition">Delete</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
