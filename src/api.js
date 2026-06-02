const API_BASE = ''  // always use relative URLs → Vercel proxy handles it

const json = (path, method = 'GET', body) =>
  fetch(API_BASE + path, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  }).then(async r => {
    if (!r.ok) throw new Error(await r.text())
    return r.status === 200 ? r.json().catch(() => null) : null
  })

export const api = {
  signup: (data) => json('/signup', 'POST', data),
  login: (data) => json('/login', 'POST', data),
  logout: () => json('/logout', 'POST'),
  me: () => json('/me'),
  feed: () => json('/feed'),
  explore: () => json('/explore'),
  createPost: (data) => json('/posts', 'POST', data),
  deletePost: (id) => json(`/posts/${id}`, 'DELETE'),
  getPost: (id) => json(`/posts/${id}`),
  likePost: (id) => json('/posts/like', 'POST', { id }),
  repost: (id) => json('/posts/repost', 'POST', { id }),
  follow: (username) => json('/follow', 'POST', { username }),
  unfollow: (username) => json('/unfollow', 'POST', { username }),
  getUser: (username) => json(`/users/${username}`),
  search: (q) => json(`/search?q=${encodeURIComponent(q)}`),
  updateProfile: (data) => json('/profile', 'PATCH', data),
  ogStatus: () => json('/og-status'),
}
