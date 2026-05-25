import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import styles from './smartcampusLayout.module.css'

const nav = [
  { to: '/buildings', label: 'Buildings' },
  { to: '/timetable', label: 'Timetable' },
  { to: '/events', label: 'Events' },
  { to: '/announcements', label: 'Announcements' },
]

export default function SmartcampusLayout() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo} aria-hidden="true" />
          <div>
            <div className={styles.title}>Smartcampus</div>
            <div className={styles.subtitle}>Student dashboard</div>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.headerRight}>
          <Link className={styles.helpLink} to="/announcements">
            Updates
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Smartcampus</span>
      </footer>
    </div>
  )
}

