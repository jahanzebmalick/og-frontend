import { useState, useEffect } from 'react'
import { api } from '../api'
import Feed from './Feed'
import Profile from './Profile'
import Search from './Search'
import Verified from './Verified'
import PromoSlideshow from './PromoSlideshow'


export default function Layout({ me, setMe }) {
  const [view, setView] = useState({ name: 'feed' })
  const [og, setOg] = useState(null)
  const [trending, setTrending] = useState([])

  useEffect(() => {
    api.ogStatus().then(setOg).catch(() => {})
    api.search('').then(setTrending).catch(() => setTrending([]))  // empty search returns latest
  }, [])

  const logout = async () => {
    await api.logout()
    setMe(null)
  }

  return (
    <div className="min-h-screen flex justify-center">
      {/* Sidebar */}
      <aside className="w-64 border-r border-og-border min-h-screen p-4 flex flex-col bg-og-bg sticky top-0 h-screen">
        <div className="text-3xl font-black mb-8 cursor-pointer" onClick={() => setView({ name: 'feed' })}>
          OG<span className="text-og-accent">.</span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavBtn active={view.name === 'feed'} onClick={() => setView({ name: 'feed' })} icon="🏠">Home</NavBtn>
          <NavBtn active={view.name === 'search'} onClick={() => setView({ name: 'search' })} icon="🔍">Search</NavBtn>
          <NavBtn active={view.name === 'profile' && view.username === me.username}
                  onClick={() => setView({ name: 'profile', username: me.username })} icon="👤">Profile</NavBtn>
        </nav>

        <div className="border-t border-og-border pt-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="font-bold flex items-center">
              {me.display_name}
              {me.verified === 1 && <Verified />}
            </div>
          </div>
          <div className="text-og-mute text-sm mb-3">@{me.username}</div>
          <button onClick={logout} className="text-og-mute hover:text-og-text text-sm">Log out</button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 max-w-2xl border-r border-og-border min-h-screen">
        {view.name === 'feed' && <Feed me={me} onView={setView} />}
        {view.name === 'profile' && <Profile username={view.username} me={me} onView={setView} />}
        {view.name === 'search' && <Search onView={setView} />}
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="w-80 p-4 hidden lg:block sticky top-0 h-screen overflow-y-auto">
        {og && <PromoSlideshow daysLeft={og.days_remaining} totalVerified={og.total_verified}/>}

        {/* Discover OGs */}
        <div className="bg-og-card border border-og-border rounded-2xl p-4 mb-4">
          <div className="font-black text-og-text mb-3 text-lg">Discover</div>
          {trending.slice(0, 5).map(u => (
            <div key={u.username} onClick={() => setView({ name: 'profile', username: u.username })}
                 className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-og-bg/50 rounded-lg px-2 -mx-2 transition">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                   style={{ background: `linear-gradient(135deg, hsl(${(u.username.charCodeAt(0) * 30) % 360}, 70%, 50%), hsl(${(u.username.charCodeAt(0) * 30 + 60) % 360}, 70%, 60%))` }}>
                {u.display_name[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 truncate">
                  <span className="font-bold text-og-text truncate">{u.display_name}</span>
                  {u.verified === 1 && <Verified size={14}/>}
                </div>
                <div className="text-og-mute text-sm truncate">@{u.username}</div>
              </div>
            </div>
          ))}
          {trending.length === 0 && <div className="text-og-mute text-sm py-4 text-center">No users yet</div>}
        </div>

        {/* Brag card */}
        <div className="bg-gradient-to-br from-og-accent/10 to-blue-900/10 border border-og-border rounded-2xl p-4 text-center">
          <div className="text-og-text font-bold mb-1">You're an OG</div>
          <div className="text-og-mute text-xs">Forever stamped. No paid verification. The early are the elite.</div>
        </div>

        {/* Footer */}
        <div className="text-og-mute text-xs mt-6 px-2">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <span>About</span>
            <span>Terms</span>
            <span>Privacy</span>
            <span>© 2026 OG</span>
          </div>
        </div>
      </aside>
    </div>
  )
}

function NavBtn({ active, onClick, icon, children }) {
  return (
    <button onClick={onClick}
            className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-full font-semibold transition ${active ? 'bg-og-card text-og-text' : 'text-og-mute hover:bg-og-card hover:text-og-text'}`}>
      <span className="text-xl">{icon}</span>
      {children}
    </button>
  )
}
