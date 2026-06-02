import { useState, useEffect } from 'react'
import Verified from './Verified'

const slides = [
  {
    bg: 'from-og-accent via-blue-600 to-blue-900',
    icon: '⚡',
    title: 'BE EARLY',
    body: 'First 90 days = automatic verification',
    cta: 'No paid badges. Ever.',
  },
  {
    bg: 'from-blue-600 via-cyan-500 to-og-accent',
    icon: '✓',
    title: 'FOREVER YOURS',
    body: 'Once OG, always OG. The badge never expires.',
    cta: 'Stamped for life.',
  },
  {
    bg: 'from-cyan-400 via-blue-500 to-purple-600',
    icon: '🔥',
    title: 'JOIN THE ELITE',
    body: 'Only the early. Only the OG.',
    cta: 'Tell your friends — fast.',
  },
  {
    bg: 'from-purple-600 via-pink-500 to-og-accent',
    icon: '⏳',
    title: 'TICK · TOCK',
    body: 'When the window closes, it never reopens.',
    cta: 'No second chances.',
  },
  {
    bg: 'from-og-accent via-cyan-400 to-blue-600',
    icon: '✦',
    title: 'STAND OUT',
    body: 'Verified means visible. Visible means heard.',
    cta: 'Get the badge. Get noticed.',
  },
]

export default function PromoSlideshow({ daysLeft, totalVerified }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIdx(i => (i + 1) % slides.length), 4000)
    return () => clearInterval(id)
  }, [paused])

  const slide = slides[idx]

  return (
    <div className="relative mb-4 overflow-hidden rounded-2xl border border-og-border"
         onMouseEnter={() => setPaused(true)}
         onMouseLeave={() => setPaused(false)}>
      
      {/* Slide content */}
      <div className={`bg-gradient-to-br ${slide.bg} p-6 min-h-[280px] relative overflow-hidden transition-all duration-1000`}
           key={idx}>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 animate-spin-slow">
            <Verified size={120}/>
          </div>
          <div className="absolute bottom-8 left-4 animate-pulse">
            <Verified size={60}/>
          </div>
          <div className="absolute top-1/2 left-1/3 animate-bounce-slow opacity-50">
            <Verified size={30}/>
          </div>
        </div>

        {/* Sparkle particles */}
        {[...Array(8)].map((_, i) => (
          <div key={`${idx}-${i}`} className="absolute text-white animate-sparkle"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 2}s`,
                 fontSize: `${10 + Math.random() * 16}px`,
               }}>
            ✦
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 text-white animate-slide-in">
          <div className="text-6xl mb-3 animate-bounce-slow">{slide.icon}</div>
          <div className="text-3xl font-black tracking-tight mb-2 drop-shadow-lg">
            {slide.title}
          </div>
          <div className="text-white/90 font-medium text-sm mb-3 leading-relaxed">
            {slide.body}
          </div>
          <div className="text-xs tracking-widest font-bold text-white/70">
            ◆ {slide.cta}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-og-card border-t border-og-border px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-og-mute text-xs tracking-widest">JOINED:</span>
          <span className="text-og-accent font-black text-sm">{totalVerified}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-og-mute text-xs tracking-widest">LEFT:</span>
          <span className="text-og-text font-black text-sm">{daysLeft}d</span>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}/>
        ))}
      </div>
    </div>
  )
}
