import {
  SiReact, SiPython, SiJavascript, SiDjango, SiFlask, SiSpringboot, SiMysql,
  SiBootstrap, SiElectron, SiRedux, SiDocker, SiGit, SiLinux, SiHtml5, SiCss,
  SiCplusplus, SiC, SiTailwindcss, SiVite,
} from 'react-icons/si'
import { FaJava, FaAws, FaShieldAlt, FaCode } from 'react-icons/fa'

const ICONS = {
  'React.js': SiReact,
  'React Native': SiReact,
  Python: SiPython,
  JavaScript: SiJavascript,
  Django: SiDjango,
  'Django REST': SiDjango,
  Flask: SiFlask,
  'Spring Boot': SiSpringboot,
  MySQL: SiMysql,
  Bootstrap: SiBootstrap,
  'Electron.js': SiElectron,
  Redux: SiRedux,
  Docker: SiDocker,
  Git: SiGit,
  Linux: SiLinux,
  HTML: SiHtml5,
  CSS: SiCss,
  'C++': SiCplusplus,
  C: SiC,
  'Tailwind CSS': SiTailwindcss,
  Vite: SiVite,
  Java: FaJava,
  AWS: FaAws,
  'AWS S3': FaAws,
  JWT: FaShieldAlt,
}

export default function TechBadge({ name }) {
  const Icon = ICONS[name] || FaCode
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent-soft">
      <Icon className="text-accent-soft" aria-hidden />
      {name}
    </span>
  )
}
