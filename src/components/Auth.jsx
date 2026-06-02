import { useState, useEffect } from 'react'
import { api } from '../api'
import Verified from './Verified'

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('signup')
  const [form, setForm] = useState({ username: '', password: '', display_name: '' })
  const [msg, setMsg] = useState('')
  const [og, setOg] = useState(null)

  useEffect(() => {
    api.ogStatus().then(setOg).catch(() => {})
  }, [])

  const submit = async () => {
    setMsg('')
    try {
      if (mode === 'signup') {
        const result = await api.signup(form)
        if (result?.verified) setMsg('🎉 You are verified OG! Logging in...')
        else setMsg('Account created (not verified — OG period ended). Logging in...')
        await api.login({ username: form.username, password: form.password })
      } else {
        await api.login({ username: form.username, password: form.password })
      }
      const me = await api.me()
      onLogin(me)
    } catch (e) {
      setMsg(e.message || 'error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-og-bg via-black to-og-bg">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-7xl font-black tracking-tighter text-og-text">
            OG<span className="text-og-accent">.</span>
          </div>
          <div className="text-og-mute text-sm tracking-widest mt-2">BE EARLY · BE VERIFIED · BE OG</div>
        </div>

        {/* Countdown banner */}
        {og && og.days_remaining > 0 && (
          <div className="bg-og-accent/10 border border-og-accent rounded-lg p-4 mb-6 text-center pulse-blue">
            <div className="text-og-mute text-xs tracking-widest">⏳ OG VERIFICATION ENDS IN</div>
            <div className="text-og-accent text-3xl font-black mt-1">{og.days_remaining} DAYS</div>
            <div className="text-og-mute text-xs mt-1 flex items-center justify-center gap-1">
              Sign up now → get <Verified size={14}/> automatically
            </div>
          </div>
        )}
        {og && og.days_remaining <= 0 && (
          <div className="bg-og-card border border-og-border rounded-lg p-4 mb-6 text-center">
            <div className="text-og-mute text-xs">OG VERIFICATION WINDOW CLOSED</div>
            <div className="text-og-text mt-1">Only earlier members have <Verified size={14}/></div>
          </div>
        )}

        {/* Form card */}
        <div className="bg-og-card border border-og-border rounded-xl p-6">
          <div className="flex gap-1 mb-4 bg-og-bg rounded-lg p-1">
            <button onClick={() => setMode('signup')}
                    className={`flex-1 py-2 rounded font-semibold ${mode === 'signup' ? 'bg-og-accent text-white' : 'text-og-mute'}`}>
              Sign Up
            </button>
            <button onClick={() => setMode('login')}
                    className={`flex-1 py-2 rounded font-semibold ${mode === 'login' ? 'bg-og-accent text-white' : 'text-og-mute'}`}>
              Log In
            </button>
          </div>

          {mode === 'signup' && (
            <input
              value={form.display_name}
              onChange={e => setForm({ ...form, display_name: e.target.value })}
              placeholder="Display name"
              className="w-full bg-og-bg border border-og-border rounded-lg p-3 mb-3 text-og-text focus:outline-none focus:border-og-accent"/>
          )}
          <input
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            placeholder="@username"
            className="w-full bg-og-bg border border-og-border rounded-lg p-3 mb-3 text-og-text focus:outline-none focus:border-og-accent"/>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="w-full bg-og-bg border border-og-border rounded-lg p-3 mb-4 text-og-text focus:outline-none focus:border-og-accent"/>

          <button onClick={submit}
                  className="w-full bg-og-accent hover:bg-blue-500 text-white py-3 rounded-full font-bold transition-colors">
            {mode === 'signup' ? 'Claim Your OG Status →' : 'Log In'}
          </button>

          {msg && <div className="mt-4 text-center text-og-mute text-sm">{msg}</div>}
        </div>

        {og && (
          <div className="text-center mt-6 text-og-mute text-xs">
            {og.total_verified} OGs verified so far
          </div>
        )}
      </div>
    </div>
  )
}
