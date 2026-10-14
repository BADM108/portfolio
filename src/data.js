// Everything you might want to edit lives here. No JSX in this file.

export const TABS = [
  { value: 'home', label: 'Home' },
  { value: 'about', label: 'About' },
  { value: 'skills', label: 'Skills' },
  { value: 'contact', label: 'Contact' },
]

export const HERO = {
  name: 'B.A.D',
  surname: 'Methyuga',
  role: 'Agentic AI Software Engineer',
  tagline: 'I build autonomous AI agents and retrieval-augmented systems.',
}

export const ABOUT = {
  lead: 'Systems that retrieve, decide and act.',
  paragraphs: [
    'I build AI agents, retrieval-augmented generation (RAG) pipelines, and the backends that run them.',
    'I approach software the way an engineer approaches a physical system. Define the constraints, measure the output, remove the waste.',
  ],
  facts: [
    { label: 'Age', value: '19' },
    { label: 'Role', value: 'Agentic AI Software Engineer' },
    { label: 'Focus', value: 'Agentic AI, RAG, backend systems' },
  ],
}

export const INTERESTS = [
  {
    title: 'Thermodynamics',
    text: 'Energy, entropy, efficiency. The rules every machine obeys.',
  },
  {
    title: 'RAG',
    text: 'Grounding language models in retrieved data. Verifiable output over guesswork.',
  },
  {
    title: 'Electrical Engineering Projects',
    text: 'Circuits, microcontrollers and embedded hardware. Software that acts on the physical world.',
  },
  {
    title: 'Self-Improvement & Building Businesses',
    text: 'Improving myself continuously. Building businesses.',
  },
  {
    title: 'Cars',
    text: 'Engineering with no compromise on performance.',
    favorite: 'Lamborghini Aventador SVJ',
  },
  {
    title: 'Jets',
    text: 'Aerodynamics and propulsion at the limit.',
    favorite: 'F-22 Raptor',
  },
]

// `icon` is a key of the ICONS object in components/Icons.jsx
export const SKILL_GROUPS = [
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'AI/ML Development', icon: 'cpu', color: 'text-sky-300' },
      { name: 'RAG', icon: 'search', color: 'text-cyan-300' },
      { name: 'Agentic AI', icon: 'bot', color: 'text-violet-300' },
      { name: 'LLM Engineering', icon: 'chat', color: 'text-emerald-300' },
      { name: 'Embeddings & Vector Search', icon: 'layers', color: 'text-blue-300' },
      { name: 'PyTorch', icon: 'code', color: 'text-orange-300' },
    ],
  },
  {
    title: 'Engineering',
    skills: [
      { name: 'Java', icon: 'java', color: 'text-orange-400' },
      { name: 'Kotlin', icon: 'kotlin', color: 'text-purple-400' },
      { name: 'C#', icon: 'csharp', color: 'text-green-400' },
      { name: 'C', icon: 'code', color: 'text-blue-400' },
      { name: 'SQL', icon: 'database', color: 'text-yellow-400' },
      { name: 'Firebase', icon: 'cloud', color: 'text-amber-500' },
      { name: 'Android Studio', icon: 'android', color: 'text-green-500' },
      { name: 'PHP', icon: 'code', color: 'text-indigo-400' },
      { name: 'CSS', icon: 'code', color: 'text-blue-500' },
      { name: 'Python', icon: 'code', color: 'text-yellow-500' },
      { name: 'MySQL', icon: 'database', color: 'text-cyan-400' },
    ],
  },
]

export const SOCIALS = [
  { label: 'GitHub', value: 'BADM108', href: 'https://github.com/BADM108', icon: 'github' },
  { label: 'LinkedIn', value: 'B.A.D Methyuga', href: 'https://www.linkedin.com/in/b-a-d-methyuga-033589350', icon: 'linkedin' },
  { label: 'Instagram', value: '@bad.qz', href: 'https://www.instagram.com/bad.qz/?utm_source=ig_web_button_share_sheet', icon: 'instagram' },
  { label: 'Email', value: 'dinathmethyuga8@gmail.com', href: 'mailto:dinathmethyuga8@gmail.com', icon: 'email' },
]