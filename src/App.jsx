import React, { useEffect, useState } from 'react'
import LiquidParticles from './components/liquidParticles'
import { getNowPlaying } from './spotify';

// --- Icons (Simple SVG library for the Skills section) ---
const Icons = {
  Java: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>,
  Kotlin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 24H0V0h24L12 12z"/></svg>,
  CSharp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  Database: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>,
  Code: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Android: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13a7 7 0 0 1 14 0m-2-3l1 2m-11-2l-1 2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>,
  Cloud: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19a5.5 5.5 0 0 0 0-11h-1.5a7 7 0 0 0-13.5 1.5A5.5 5.5 0 0 0 2.5 19h15z"/></svg>,
  Instagram: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>,
  LinkedIn: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  GitHub: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.544 2.914 1.186.092-.923.35-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>,
  Email: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};

function SpotifyWidget() {
  const [track, setTrack] = useState(null);
  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await getNowPlaying();
        if (res.status === 204 || res.status > 400) { setTrack(null); return; }
        const data = await res.json();
        setTrack({
          title: data.item.name,
          artist: data.item.artists.map((_artist) => _artist.name).join(', '),
          albumArt: data.item.album.images[0].url,
          isPlaying: data.is_playing,
          songUrl: data.item.external_urls.spotify,
        });
      } catch (e) { console.error(e); }
    };
    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <a href={track?.songUrl || "#"} target="_blank" rel="noopener noreferrer"
      className="group relative flex items-center gap-6 p-10 rounded-[60px] transition-all duration-700 
                 bg-white/[0.03] backdrop-blur-2xl border border-white/10 
                 hover:bg-white/[0.06] hover:border-white/20 flex-1 shadow-2xl">
      <div className="relative flex-shrink-0">
        <div className="absolute -inset-4 bg-[#1DB954]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        {track?.albumArt ? (
          <img src={track.albumArt} className={`relative w-48 h-48 rounded-[40px] shadow-2xl transition-all duration-700 group-hover:scale-105 ${track.isPlaying ? '' : 'grayscale opacity-50'}`} alt="Art" />
        ) : (
          <div className="relative w-48 h-48 bg-white/5 rounded-[40px] flex items-center justify-center border border-white/5 animate-pulse" />
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#1DB954] font-black">{track?.isPlaying ? 'Currently Jamming To' : 'Last Played'}</p>
        <h2 className="text-3xl font-bold text-white tracking-tighter truncate">{track?.title || "Silence"}</h2>
        <p className="text-[#888888] text-base font-medium truncate italic">{track?.artist || "Spotify"}</p>
      </div>
    </a>
  );
}

function PinterestWidget() {
  const [pins, setPins] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent("https://www.pinterest.com/badmethyuga/widget.rss")}`);
        const data = await response.json();
        if (data.items) {
          setPins(data.items.map(item => item.description.match(/src="([^"]+)"/)?.[1].replace('236x', 'originals')).filter(Boolean));
        }
      } catch (e) {}
    };
    fetchPins();
  }, []);

  useEffect(() => {
    if (pins.length) {
      const int = setInterval(() => setCurrentIndex(p => (p + 1) % pins.length), 5000);
      return () => clearInterval(int);
    }
  }, [pins]);

  return (
    <div className="group relative flex items-center gap-6 p-10 rounded-[60px] transition-all duration-700 
                    bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:bg-white/[0.06] hover:border-white/20 flex-1 shadow-2xl">
      <div className="relative flex-shrink-0 w-48 h-48 overflow-hidden rounded-[40px] shadow-2xl bg-white/5">
        {pins.map((src, i) => {
          const position = i - currentIndex;
          return (
            <img key={i} src={src} className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${position === 0 ? 'translate-x-0 opacity-100' : position > 0 ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0'}`} alt="Pin" />
          );
        })}
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#888888] font-black">Visual Intrests</p>
        <h2 className="text-3xl font-bold text-white tracking-tighter">Widget <span className="text-white/20 italic">Archive</span></h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <p className="text-[#555555] text-[10px] tracking-widest font-bold uppercase">Cloud Sync Active</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const skills = [
    { name: "Java", icon: <Icons.Java />, color: "text-orange-400" },
    { name: "Kotlin", icon: <Icons.Kotlin />, color: "text-purple-400" },
    { name: "C#", icon: <Icons.CSharp />, color: "text-green-400" },
    { name: "C", icon: <Icons.Code />, color: "text-blue-400" },
    { name: "SQL", icon: <Icons.Database />, color: "text-yellow-400" },
    { name: "Firebase", icon: <Icons.Cloud />, color: "text-amber-500" },
    { name: "Android Studio", icon: <Icons.Android />, color: "text-green-500" },
    { name: "PHP", icon: <Icons.Code />, color: "text-indigo-400" },
    { name: "CSS", icon: <Icons.Code />, color: "text-blue-500" },
    { name: "Python", icon: <Icons.Code />, color: "text-yellow-500" },
    { name: "MySQL", icon: <Icons.Database />, color: "text-cyan-400" },
  ];

  return (
    <div className="relative w-full bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-white/20 flex flex-col min-h-screen">
      <div className="fixed inset-0 z-0"><LiquidParticles /></div>

      <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto px-8">
        
        {/* Header Section */}
        <header className="pt-16 pb-12 flex flex-col md:flex-row items-center gap-12 text-left">
           <div className="relative group">
               <div className="absolute -inset-2 bg-white/5 rounded-[45px] blur-2xl opacity-50" />
               <img src="./src/assets/pfp.jpg" alt="Profile" className="w-44 h-44 md:w-56 md:h-56 object-cover rounded-[40px] border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" />
           </div>
           <div className="flex flex-col">
             <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.85] mb-4">B.A.D <br/><span className="text-white/20">Methyuga.</span></h1>
             <p className="text-[#888888] max-w-lg text-lg leading-relaxed font-medium">Software Engineer & Backend Architect. Crafting systems in my own way.</p>
           </div>
        </header>

        {/* Liquid Glass Nav */}
        <section className="flex flex-col pb-16">
          <div className="flex justify-center mb-12">
            <nav className="relative group inline-flex gap-1 p-1.5 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Liquid Light Highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
              {['home', 'about', 'skills', 'contact'].map((tab) => (
                <button key={tab} onClick={(e) => { e.preventDefault(); setActiveTab(tab); }} 
                  className={`relative px-12 py-3.5 rounded-full text-[11px] uppercase tracking-[0.3em] font-black font-montserrat transition-all duration-700 
                    ${activeTab === tab ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            {activeTab === 'home' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-1000 overflow-hidden">
                <SpotifyWidget />
                <PinterestWidget />
              </div>
            )}

            {activeTab === 'skills' && (
               <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[60px] p-16 animate-in slide-in-from-bottom-12 duration-1000">
                 <h2 className="text-4xl font-bold mb-12 tracking-tighter text-white">Engineering Suite</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                   {skills.map(skill => (
                     <div key={skill.name} className="group flex items-center gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500">
                       <div className={`${skill.color} transition-transform group-hover:scale-110`}>{skill.icon}</div>
                       <span className="text-sm font-bold tracking-tight text-white/80 group-hover:text-white">{skill.name}</span>
                     </div>
                   ))}
                 </div>
               </div>
            )}

            {activeTab === 'about' && (
              <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[60px] p-16 animate-in slide-in-from-bottom-12 duration-1000">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className="text-5xl font-bold text-white tracking-tighter mb-4">About <span className="text-white/30">Me</span></h2>
                      <div className="w-16 h-1 bg-gradient-to-r from-white to-white/20 rounded-full"></div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="group">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black mb-2">Age</p>
                        <p className="text-2xl font-bold text-white">19</p>
                      </div>
                      
                      <div className="group">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black mb-2">Profession</p>
                        <p className="text-2xl font-bold text-white">Full Stack <span className="text-white/40">Developer</span></p>
                      </div>
                      
                      <div className="group">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black mb-2">Philosophy</p>
                        <p className="text-2xl font-bold text-white">Stoic. <span className="text-white/40">Calculated.</span> Building empires.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <h3 className="text-xl font-bold text-white tracking-tight">What I'm About</h3>
                    
                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-2">Aesthetic</p>
                        <p className="text-sm text-white/80">Mafia elegance. Sharp precision. Timeless, disciplined grace.</p>
                      </div>
                      
                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-2">Passions</p>
                        <p className="text-sm text-white/80">Money. Luxury. High-performance cars. Majestic architecture. Power.</p>
                      </div>
                      
                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-2">Lifestyle</p>
                        <p className="text-sm text-white/80">Lifting iron. Building strength. Grinding for greatness. No compromise.</p>
                      </div>
                      
                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-2">Mindset</p>
                        <p className="text-sm text-white/80">Code. Systems. Dominate. Create. Iterate. Perfection is a process.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-12 duration-1000">
                {[
                  { label: "Instagram", val: "@badm_____", link: "https://www.instagram.com/badm_____?igsh=dDhyNDJydncwNzlj", icon: <Icons.Instagram /> },
                  { label: "LinkedIn", val: "B.A.D Methyuga", link: "https://www.linkedin.com/in/b-a-d-methyuga-033589350", icon: <Icons.LinkedIn /> },
                  { label: "GitHub", val: "BADM108", link: "https://github.com/BADM108", icon: <Icons.GitHub /> },
                  { label: "Email", val: "dinathmethyuga8@gmail.com", link: "mailto:dinathmethyuga8@gmail.com", icon: <Icons.Email /> }
                ].map(item => (
                  <a key={item.label} href={item.link} target="_blank" rel="noreferrer" 
                    className="p-10 rounded-[50px] bg-white/[0.02] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 group flex items-start gap-6">
                    <div className="flex-shrink-0 text-white/60 group-hover:text-white transition-colors duration-500">{item.icon}</div>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-[0.4em] text-[#555555] font-black group-hover:text-white/40 mb-2">{item.label}</p>
                      <p className="text-xl font-bold text-white tracking-tighter">{item.val}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="pb-10 text-center text-[#333] text-[9px] uppercase tracking-[1em] mt-auto">
          &copy; 2026 • Methyuga 
        </footer>
      </div>
    </div>
  )
}

export default App;