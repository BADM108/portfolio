import React, { useEffect, useState } from 'react'
import Iridescence from './components/Iridescence' // Swapped from LiquidParticles
import { getNowPlaying } from './spotify';
import profilePic from './assets/pfp.jpg';

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
      className="group relative flex items-center gap-4 md:gap-6 p-6 md:p-10 rounded-[40px] md:rounded-[60px] transition-all duration-700 
                 bg-white/[0.03] backdrop-blur-2xl border border-white/10 
                 hover:bg-white/[0.06] hover:border-white/20 flex-1 shadow-2xl">
      <div className="relative flex-shrink-0">
        <div className="absolute -inset-4 bg-[#1DB954]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        {track?.albumArt ? (
          <img src={track.albumArt} className={`relative w-24 h-24 md:w-48 md:h-48 rounded-[30px] md:rounded-[40px] shadow-2xl transition-all duration-700 group-hover:scale-105 ${track.isPlaying ? '' : 'grayscale opacity-50'}`} alt="Art" />
        ) : (
          <div className="relative w-24 h-24 md:w-48 md:h-48 bg-white/5 rounded-[30px] md:rounded-[40px] flex items-center justify-center border border-white/5 animate-pulse" />
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-[#1DB954] font-black">{track?.isPlaying ? 'Currently Jamming To' : 'Last Played'}</p>
        <h2 className="text-xl md:text-3xl font-bold text-white tracking-tighter truncate">{track?.title || "Silence"}</h2>
        <p className="text-[#888888] text-sm md:text-base font-medium truncate italic">{track?.artist || "Spotify"}</p>
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
    <div className="group relative flex items-center gap-4 md:gap-6 p-6 md:p-10 rounded-[40px] md:rounded-[60px] transition-all duration-700 
                    bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:bg-white/[0.06] hover:border-white/20 flex-1 shadow-2xl">
      <div className="relative flex-shrink-0 w-24 h-24 md:w-48 md:h-48 overflow-hidden rounded-[30px] md:rounded-[40px] shadow-2xl bg-white/5">
        {pins.map((src, i) => {
          const position = i - currentIndex;
          return (
            <img key={i} src={src} className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${position === 0 ? 'translate-x-0 opacity-100' : position > 0 ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0'}`} alt="Pin" />
          );
        })}
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-[#888888] font-black">Visual Interests</p>
        <h2 className="text-xl md:text-3xl font-bold text-white tracking-tighter">Widget <span className="text-white/20 italic">Archive</span></h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <p className="text-[#555555] text-[8px] md:text-[10px] tracking-widest font-bold uppercase">Cloud Sync Active</p>
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
    <div className="relative w-full bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-white/20 flex flex-col min-h-screen overflow-x-hidden">
      {/* Background Component Swapped */}
      <div className="fixed inset-0 z-0"><Iridescence /></div>

      <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section Optimized for Mobile Margins */}
        <header className="pt-12 md:pt-16 pb-8 md:pb-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
           <div className="relative group">
               <div className="absolute -inset-2 bg-white/5 rounded-[45px] blur-2xl opacity-50" />
               <img src={profilePic} alt="Profile" className="w-36 h-36 md:w-56 md:h-56 object-cover rounded-[35px] md:rounded-[40px] border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" />
           </div>
           <div className="flex flex-col">
             <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-white leading-tight md:leading-[0.85] mb-4">B.A.D <br className="hidden md:block"/><span className="text-white/20">Methyuga.</span></h1>
             <p className="text-[#888888] max-w-sm md:max-w-lg text-base md:text-lg leading-relaxed font-medium">Software Engineer & Backend Architect. Crafting systems in my own way.</p>
           </div>
        </header>

        {/* Navigation Responsive Padding */}
        <section className="flex flex-col pb-16">
          <div className="flex justify-center mb-10 md:mb-12 overflow-x-auto no-scrollbar w-full">
            <nav className="relative group inline-flex gap-1 p-1 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl">
              {['home', 'about', 'skills', 'contact'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} 
                  className={`relative px-6 md:px-12 py-2.5 md:py-3.5 rounded-full text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black transition-all duration-700 
                    ${activeTab === tab ? 'bg-white text-black shadow-xl' : 'text-white/30 hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            {activeTab === 'home' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 animate-in fade-in zoom-in-95 duration-1000">
                <SpotifyWidget />
                <PinterestWidget />
              </div>
            )}

            {activeTab === 'skills' && (
               <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[40px] md:rounded-[60px] p-8 md:p-16 animate-in slide-in-from-bottom-12 duration-1000">
                 <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 tracking-tighter text-white">Engineering Suite</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                   {skills.map(skill => (
                     <div key={skill.name} className="group flex items-center gap-3 md:gap-4 p-3 md:p-5 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all">
                       <div className={`${skill.color}`}>{skill.icon}</div>
                       <span className="text-xs md:text-sm font-bold text-white/80">{skill.name}</span>
                     </div>
                   ))}
                 </div>
               </div>
            )}

            {activeTab === 'about' && (
              <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[40px] md:rounded-[60px] p-8 md:p-16 animate-in slide-in-from-bottom-12 duration-1000">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">About <span className="text-white/30">Me</span></h2>
                      <div className="w-16 h-1 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="space-y-6">
                      <div className="group"><p className="text-[9px] uppercase tracking-widest text-white/40 font-black mb-1">Age</p><p className="text-xl md:text-2xl font-bold text-white">19</p></div>
                      <div className="group"><p className="text-[9px] uppercase tracking-widest text-white/40 font-black mb-1">Profession</p><p className="text-xl md:text-2xl font-bold text-white">Full Stack Developer</p></div>
                      <div className="group"><p className="text-[9px] uppercase tracking-widest text-white/40 font-black mb-1">Philosophy</p><p className="text-xl md:text-2xl font-bold text-white">Stoic. Calculated. Building empires.</p></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-white mb-2">What I'm About</h3>
                    {[
                      { l: "Aesthetic", v: "Mafia elegance. Sharp precision. Timeless grace." },
                      { l: "Passions", v: "Money. Luxury. High-performance cars. Power." },
                      { l: "Lifestyle", v: "Lifting iron. Building strength. No compromise." },
                      { l: "Mindset", v: "Code. Systems. Dominate. Create. Iterate." }
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <p className="text-[8px] uppercase text-white/40 font-black mb-1">{item.l}</p>
                        <p className="text-xs md:text-sm text-white/80">{item.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-bottom-12 duration-1000">
                {[
                  { label: "Instagram", val: "@badm_____", link: "https://www.instagram.com/badm_____?igsh=dDhyNDJydncwNzlj", icon: <Icons.Instagram /> },
                  { label: "LinkedIn", val: "B.A.D Methyuga", link: "https://www.linkedin.com/in/b-a-d-methyuga-033589350", icon: <Icons.LinkedIn /> },
                  { label: "GitHub", val: "BADM108", link: "https://github.com/BADM108", icon: <Icons.GitHub /> },
                  { label: "Email", val: "dinathmethyuga8@gmail.com", link: "mailto:dinathmethyuga8@gmail.com", icon: <Icons.Email /> }
                ].map(item => (
                  <a key={item.label} href={item.link} target="_blank" rel="noreferrer" 
                    className="p-6 md:p-10 rounded-[35px] md:rounded-[50px] bg-white/[0.02] border border-white/10 hover:border-white/20 flex items-center gap-6">
                    <div className="text-white/60 group-hover:text-white">{item.icon}</div>
                    <div className="min-w-0">
                      <p className="text-[8px] uppercase tracking-widest text-[#555555] font-black">{item.label}</p>
                      <p className="text-lg font-bold text-white truncate">{item.val}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="pb-10 text-center text-[#333] text-[8px] uppercase tracking-[0.5em] mt-auto">
          &copy; 2026 • Methyuga 
        </footer>
      </div>
    </div>
  )
}

export default App;