import { useEffect, useState } from 'react'

// Public URL of YOUR Cloudflare Worker (this is not a secret).
// `wrangler deploy` prints it. Paste it here and keep "/now-playing" at the end.
const ENDPOINT = 'https://spotify-now-playing.methyuga.workers.dev/now-playing'
const POLL_MS = 20_000

const OFFLINE = { isPlaying: false, title: null, artist: null, albumArt: null, songUrl: null }

// Survives tab switches, so coming back to Home shows the last track instantly
// instead of flashing "Connecting" and re-fetching.
let cached = { data: null, at: 0 }

// Returns null until the first result arrives, then always an object.
export function useNowPlaying() {
  const [data, setData] = useState(cached.data)

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      if (document.hidden) return
      try {
        const res = await fetch(ENDPOINT, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const next = await res.json()
        cached = { data: next, at: Date.now() }
        setData((prev) =>
          prev && prev.songUrl === next.songUrl && prev.isPlaying === next.isPlaying ? prev : next,
        )
      } catch (err) {
        if (err.name !== 'AbortError') setData((prev) => prev ?? OFFLINE)
      }
    }

    if (Date.now() - cached.at > POLL_MS) load()
    const timer = setInterval(load, POLL_MS)
    document.addEventListener('visibilitychange', load)

    return () => {
      controller.abort()
      clearInterval(timer)
      document.removeEventListener('visibilitychange', load)
    }
  }, [])

  return data
}
