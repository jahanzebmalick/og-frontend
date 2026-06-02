import { useState } from 'react'
import { api } from '../api'
import Verified from './Verified'
import Avatar from './Avatar'


export default function Post({ post, me, onUpdate, onView }) {
  const [liking, setLiking] = useState(false)
  
  const toggle = async (e) => {
    e.stopPropagation()
    setLiking(true)
    await api.likePost(post.id)
    onUpdate()
    setTimeout(() => setLiking(false), 600)
  }
  
  const del = async (e) => {
    e.stopPropagation()
    if (confirm('Delete this post?')) {
      await api.deletePost(post.id)
      onUpdate()
    }
  }

  const timeAgo = (date) => {
    const diff = (Date.now() - new Date(date)) / 1000
    if (diff < 60) return `${Math.floor(diff)}s`
    if (diff < 3600) return `${Math.floor(diff / 60)}m`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    return `${Math.floor(diff / 86400)}d`
  }


  return (
   <div onClick={() => onView({ name: 'post', id: post.id })}
     className="group relative p-5 border-b border-og-border hover:bg-og-card/30 transition-all cursor-pointer overflow-hidden">
    {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-og-accent/0 via-og-accent/5 to-og-accent/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      
<div className="relative flex gap-3">
  {/* Avatar */}
  <div className="relative flex-shrink-0">
    <Avatar name={post.owner} displayName={post.owner_display_name}/>
    {post.owner_verified === 1 && (
      <div className="absolute -bottom-1 -right-1 bg-og-bg rounded-full p-0.5">
        <Verified size={14}/>
      </div>
    )}
  </div>
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1.5 mb-1 flex-wrap"
               onClick={() => onView({ name: 'profile', username: post.owner })}>
            <span className="font-bold text-og-text hover:underline truncate">{post.owner_display_name || post.owner}</span>
            {post.owner_verified === 1 && <Verified size={15}/>}
            <span className="text-og-mute text-sm">@{post.owner}</span>
            <span className="text-og-mute">·</span>
            <span className="text-og-mute text-sm hover:underline">{timeAgo(post.created_at)}</span>
          </div>

          {/* Content */}
          <div className="text-og-text whitespace-pre-wrap text-[15px] leading-relaxed mb-3 break-words">
            {post.text}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 -ml-2">
            {/* Like */}
            <button onClick={toggle}
                    className={`group/like flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all hover:bg-pink-500/10 ${post.liked ? 'text-pink-500' : 'text-og-mute hover:text-pink-500'}`}>
              <div className={`relative ${liking ? 'animate-ping-once' : ''}`}>
                {post.liked ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                )}
                {/* Particle burst on like */}
                {liking && post.liked && (
                  <>
                    <span className="absolute -top-2 -left-2 text-pink-500 text-xs animate-burst" style={{animationDelay: '0s'}}>✦</span>
                    <span className="absolute -top-2 -right-2 text-pink-500 text-xs animate-burst" style={{animationDelay: '0.1s'}}>✦</span>
                    <span className="absolute -bottom-2 -left-2 text-pink-500 text-xs animate-burst" style={{animationDelay: '0.15s'}}>✦</span>
                    <span className="absolute -bottom-2 -right-2 text-pink-500 text-xs animate-burst" style={{animationDelay: '0.2s'}}>✦</span>
                  </>
                )}
              </div>
              <span className="text-sm font-medium tabular-nums">{post.likes > 0 ? post.likes : ''}</span>
            </button>

            {/* Reply (visual only for now) */}
            <button onClick={(e) => { e.stopPropagation(); onView({ name: 'post', id: post.id }) }}
        className="...">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </button>

            {/* Delete */}
            {post.owner === me.username && (
              <button onClick={del}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-og-mute hover:text-red-500 hover:bg-red-500/10 transition ml-auto">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
