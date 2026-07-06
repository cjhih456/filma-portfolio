import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/frontend', label: 'Frontend' },
  { to: '/backend', label: 'Backend' },
  { to: '/ml', label: 'ML' },
]

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="site-logo">
          FILMA <span>Portfolio</span>
        </Link>
        <nav className="site-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="main-content">{children}</main>
      <footer className="site-footer">
        <p>KAKAMU / FILMA — Full-Stack Portfolio · cjhih456 · 2026</p>
      </footer>
    </div>
  )
}
