// All icons live here so App.jsx stays readable.
// Usage: <Icon name="github" />. Every icon accepts `size` (px) and passes other props to the <svg>.

const Svg = ({ size = 20, fill = 'none', strokeWidth = 2, children, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={fill === 'none' ? 'currentColor' : 'none'}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
)

const ICONS = {
  // ---- existing skill icons (unchanged shapes) ----
  java: (p) => <Svg {...p}><path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></Svg>,
  kotlin: (p) => <Svg fill="currentColor" {...p}><path d="M24 24H0V0h24L12 12z" /></Svg>,
  csharp: (p) => <Svg {...p}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></Svg>,
  database: (p) => (
    <Svg {...p}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </Svg>
  ),
  code: (p) => (
    <Svg {...p}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Svg>
  ),
  android: (p) => (
    <Svg {...p}>
      <path d="M5 13a7 7 0 0 1 14 0m-2-3l1 2m-11-2l-1 2" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="15" cy="13" r="1" />
    </Svg>
  ),
  cloud: (p) => <Svg {...p}><path d="M17.5 19a5.5 5.5 0 0 0 0-11h-1.5a7 7 0 0 0-13.5 1.5A5.5 5.5 0 0 0 2.5 19h15z" /></Svg>,

  // ---- new AI / ML icons ----
  cpu: (p) => (
    <Svg {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </Svg>
  ),
  search: (p) => (
    <Svg {...p}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </Svg>
  ),
  bot: (p) => (
    <Svg {...p}>
      <path d="M12 8V4H8" />
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
    </Svg>
  ),
  chat: (p) => <Svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Svg>,
  layers: (p) => (
    <Svg {...p}>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </Svg>
  ),

  // ---- social icons ----
  instagram: (p) => (
    <Svg size={26} strokeWidth={1.5} {...p}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </Svg>
  ),
  linkedin: (p) => (
    <Svg size={26} strokeWidth={1.5} {...p}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </Svg>
  ),
  github: (p) => (
    <Svg size={26} strokeWidth={1.5} {...p}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.544 2.914 1.186.092-.923.35-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </Svg>
  ),
  email: (p) => (
    <Svg size={26} strokeWidth={1.5} {...p}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </Svg>
  ),
}

export default function Icon({ name, ...props }) {
  const Glyph = ICONS[name]
  return Glyph ? <Glyph {...props} /> : null
}