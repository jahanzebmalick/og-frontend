import { useState } from 'react'
import { api } from '../api'
import Avatar from './Avatar'


export default function Compose({ me, onPost, replyTo }) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const [posting, setPosting] = useState(false)

  const submit = async () => {
    if (!text.trim() || posting) return
    setPosting(true)
    await api.createPost({ text, reply_to: replyTo || null })
    setText('')
    setPosting(false)
    onPost()
  }

  const charPct = (text.length / 280) * 100
  const charColor = text.length > 260 ? '#ef4444' : text.length > 240 ? '#eab308' : '#1d9bf0'

  return (
    <div className={`p-4 border-b border-og-border flex gap-3 transition-all ${focused ? 'bg-og-card/20' : ''}`}>
  <Avatar name={me.username} displayName={me.display_name}/>
      <div className="flex-1">
        <textarea value={text} onChange={e => setText(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder={replyTo ? "Post your reply" : "What's on your mind?"}
                  rows={focused || text ? 3 : 2}
                  maxLength={280}
                  className="w-full bg-transparent text-og-text text-[18px] focus:outline-none resize-none placeholder-og-mute"/>
        
        <div className="flex justify-between items-center pt-3 mt-2 border-t border-og-border/50">
          {/* Character progress ring */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
                <circle cx="16" cy="16" r="13" fill="none" stroke={charColor} strokeWidth="2"
                        strokeDasharray={`${(charPct / 100) * 81.68} 81.68`}
                        className="transition-all duration-200"/>
              </svg>
              {text.length > 220 && (
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: charColor }}>
                  {280 - text.length}
                </div>
              )}
            </div>
          </div>

          <button onClick={submit} disabled={!text.trim() || posting}
                  className="bg-gradient-to-r from-og-accent to-blue-500 hover:from-blue-500 hover:to-og-accent disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-og-accent/30">
            {posting ? '...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  )
}
