function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export default function Avatar({ name, displayName, size = 'md' }) {
  const hash = hashString(name || '')
  const hue1 = hash % 360
  const hue2 = (hue1 + 80) % 360
  const gradient = `linear-gradient(135deg, hsl(${hue1}, 70%, 50%), hsl(${hue2}, 75%, 55%))`
  
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-11 h-11 text-lg',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-20 h-20 text-3xl border-4 border-og-bg',
  }
  
  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0`}
         style={{ background: gradient }}>
      {((displayName || name || '?')[0] || '?').toUpperCase()}
    </div>
  )
}
