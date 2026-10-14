import { memo } from 'react'
import { useNowPlaying } from '../hooks/useNowPlaying'

const BARS = [0, 0.25, 0.5, 0.15]

function NowPlaying() {
  const data = useNowPlaying()
  const loading = data === null
  const hasTrack = Boolean(data?.title)
  const live = Boolean(data?.isPlaying)
  const label = loading ? 'Connecting' : live ? 'Now playing' : hasTrack ? 'Last played' : 'Offline'

  const Wrapper = hasTrack && data.songUrl ? 'a' : 'div'
  const linkProps =
    Wrapper === 'a' ? { href: data.songUrl, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Wrapper
      {...linkProps}
      className="panel group flex w-full max-w-2xl items-center gap-5 p-5 transition-colors duration-300 hover:border-white/20 md:gap-6 md:p-6"
    >
      {data?.albumArt ? (
        <img
          src={data.albumArt}
          alt={`Album art for ${data.title}`}
          width="112"
          height="112"
          decoding="async"
          className={`h-20 w-20 shrink-0 rounded-xl object-cover shadow-2xl transition duration-500 md:h-28 md:w-28 ${
            live ? '' : 'opacity-60 grayscale'
          }`}
        />
      ) : (
        <div
          aria-hidden="true"
          className={`h-20 w-20 shrink-0 rounded-xl border border-white/5 bg-white/5 md:h-28 md:w-28 ${
            loading ? 'animate-pulse' : ''
          }`}
        />
      )}

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2.5">
          {live && (
            <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
              {BARS.map((delay) => (
                <span
                  key={delay}
                  className="eq-bar h-full w-[3px] rounded-full bg-[#1DB954]"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </span>
          )}
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#1DB954]">{label}</p>
        </div>
        <h2 className="truncate text-lg font-semibold tracking-tight text-white md:text-2xl">
          {data?.title || (loading ? '\u00A0' : 'Nothing playing')}
        </h2>
        <p className="truncate text-sm text-steel md:text-base">
          {data?.artist || (loading ? '\u00A0' : 'Spotify')}
        </p>
      </div>
    </Wrapper>
  )
}

export default memo(NowPlaying)