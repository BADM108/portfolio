import { memo, useCallback, useEffect, useState } from 'react'
import JellyRadio from './components/JellyRadio'
import Silk from './components/Silk'
import NowPlaying from './components/NowPlaying'
import Icon from './components/Icons'
import profilePic from './assets/pfp.jpg'
import { ABOUT, HERO, INTERESTS, SKILL_GROUPS, SOCIALS, TABS } from './data'

const YEAR = new Date().getFullYear()
const TAB_IDS = TABS.map((t) => t.value)

const labelClass = 'font-mono text-[10px] uppercase tracking-[0.25em] text-white/40'
const cardClass = 'rounded-2xl border border-white/8 bg-white/[0.03] transition-colors hover:border-white/20'

/* ---------- Background ---------- */
// memo + primitive props = this never re-renders, so the WebGL scene is created once
// and is never rebuilt when you click a tab or when Spotify data changes.
const Background = memo(function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Silk
        color="#3a404c"
        sheenColor="#b9c3d6"
        speed={3}
        scale={1.1}
        noiseIntensity={1.2}
        sheen={0.35}
        depth={0.8}
        glow={0.2}
        ripple={0.8}
        wave={0.8}
        dpr={1}
      />
      {/* vignette keeps text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,6,8,0.55)_70%,rgba(5,6,8,0.92)_100%)]" />
    </div>
  )
})

/* ---------- Small helpers ---------- */
function useCompact(query = '(max-width: 480px)') {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatch(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return match
}

const readHash = () => {
  const hash = window.location.hash.slice(1)
  return TAB_IDS.includes(hash) ? hash : 'home'
}

/* ---------- Tabs ---------- */
function HomeTab() {
  return (
    <div className="flex justify-center">
      <NowPlaying />
    </div>
  )
}

function AboutTab() {
  return (
    <div className="panel p-6 md:p-12">
      <p className={labelClass}>About</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">{ABOUT.lead}</h2>

      <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-steel md:text-lg">
        {ABOUT.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <dl className="mt-10 grid gap-3 sm:grid-cols-3">
        {ABOUT.facts.map((f) => (
          <div key={f.label} className={`${cardClass} p-4`}>
            <dt className={labelClass}>{f.label}</dt>
            <dd className="mt-1.5 text-base font-semibold text-white">{f.value}</dd>
          </div>
        ))}
      </dl>

      <h3 className={`${labelClass} mb-4 mt-12`}>Interests</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {INTERESTS.map((item) => (
          <article key={item.title} className={`${cardClass} p-5`}>
            <h4 className="text-base font-semibold text-white">{item.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-steel">{item.text}</p>
            {item.favorite && (
              <p className={`${labelClass} mt-4 border-t border-white/8 pt-3`}>
                Favorite
                <span className="ml-2 font-sans text-xs font-medium normal-case tracking-normal text-white/90">
                  {item.favorite}
                </span>
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

function SkillsTab() {
  return (
    <div className="panel space-y-10 p-6 md:p-12">
      {SKILL_GROUPS.map((group) => (
        <section key={group.title}>
          <h2 className={`${labelClass} mb-5`}>{group.title}</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {group.skills.map((skill) => (
              <li key={skill.name} className={`${cardClass} flex items-center gap-3 p-3.5 md:p-4`}>
                <span className={`shrink-0 ${skill.color}`}>
                  <Icon name={skill.icon} />
                </span>
                <span className="text-sm font-medium text-white/85">{skill.name}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function ContactTab() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {SOCIALS.map((s) => {
        const external = s.href.startsWith('http')
        return (
          <a
            key={s.label}
            href={s.href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="panel group flex items-center gap-5 p-5 transition-colors hover:border-white/20 md:p-7"
          >
            <span className="shrink-0 text-white/60 transition-colors group-hover:text-white">
              <Icon name={s.icon} />
            </span>
            <span className="min-w-0">
              <span className={`${labelClass} block`}>{s.label}</span>
              <span className="block truncate text-base font-semibold text-white md:text-lg">{s.value}</span>
            </span>
          </a>
        )
      })}
    </div>
  )
}

/* ---------- App ---------- */
export default function App() {
  const [tab, setTab] = useState(readHash)
  const compact = useCompact()

  // Switching tabs only changes React state + the URL hash. No page load, no reload.
  const changeTab = useCallback((value) => {
    setTab(value)
    window.history.replaceState(null, '', `#${value}`)
  }, [])

  useEffect(() => {
    const onHash = () => setTab(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden">
      <Background />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 md:px-8">
        <header className="flex flex-col items-center gap-8 pb-10 pt-14 text-center md:flex-row md:gap-12 md:pb-12 md:pt-20 md:text-left">
          <img
            src={profilePic}
            alt={`${HERO.name} ${HERO.surname}`}
            width="208"
            height="208"
            className="h-36 w-36 rounded-3xl border border-white/10 object-cover shadow-2xl grayscale transition-[filter] duration-700 hover:grayscale-0 md:h-52 md:w-52"
          />
          <div>
            <p className={`${labelClass} mb-4 tracking-[0.3em]`} style={{ color: '#3b3b3b' }}>
              {HERO.role}
            </p>
            <h1
              className="text-4xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl"
              style={{ color: '#3b3b3b' }}
            >
              <span style={{ color: '#4a4a4a' }}>{HERO.name}</span>{' '}
              <span style={{ color: 'rgba(59, 59, 59, 0.7)' }}>{HERO.surname}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-steel md:text-lg" style={{ color: '#3b3b3b' }}>
              {HERO.tagline}
            </p>
          </div>
        </header>

        <nav aria-label="Sections" className="flex justify-center pb-8">
          <JellyRadio
            items={TABS}
            value={tab}
            onChange={changeTab}
            ariaLabel="Site sections"
            size={compact ? 'sm' : 'md'}
            gap={compact ? 6 : 8}
            radius={999}
            chipColor="#15171c"
            activeColor="#e8ecf3"
            textColor="#b4bbc8"
            activeTextColor="#0a0b0e"
          />
        </nav>

        <main className="flex-1 pb-16">
          <div key={tab} className="tab-in">
            {tab === 'home' && <HomeTab />}
            {tab === 'about' && <AboutTab />}                                                                                               
            {tab === 'skills' && <SkillsTab />}
            {tab === 'contact' && <ContactTab />}
          </div>
        </main>

        <footer className="pb-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
          &copy; {YEAR} B.A.D Methyuga
        </footer>
      </div>
    </div>
  )
}