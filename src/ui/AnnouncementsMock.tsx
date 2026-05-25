import React from 'react'
import styles from './announcementsMock.module.css'

type Announcement = { title: string; body: string; date: string; priority: 'High' | 'Normal' }

const announcements: Announcement[] = [
  {
    title: 'Library extended hours during exams',
    body: 'The library will stay open until 1:00 AM from Monday to Friday. Quiet zones remain enforced.',
    date: 'May 06',
    priority: 'High',
  },
  {
    title: 'Campus Wi‑Fi maintenance',
    body: 'Scheduled maintenance will occur on Wednesday 2:00 AM–4:00 AM. Intermittent connectivity may happen.',
    date: 'May 03',
    priority: 'Normal',
  },
]

const prStyles: Record<Announcement['priority'], { bg: string; fg: string; br: string }> = {
  High: { bg: 'rgba(255,78,78,.15)', fg: '#ffd2d2', br: 'rgba(255,78,78,.40)' },
  Normal: { bg: 'rgba(255,255,255,.08)', fg: 'rgba(232,238,252,.9)', br: 'rgba(255,255,255,.25)' },
}

export function AnnouncementsMock() {
  return (
    <div className={styles.wrap}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.kicker}>Official updates</div>
          <div className={styles.title}>Announcements</div>
        </div>
        <div className={styles.searchWrap}>
          <input className={styles.search} placeholder="Search (mock)" onChange={() => {}} />
        </div>
      </div>

      <div className={styles.list}>
        {announcements.map((a) => {
          const s = prStyles[a.priority]
          return (
            <article key={a.title} className={styles.item}>
              <div className={styles.topRow}>
                <div className={styles.itemTitle}>{a.title}</div>
                <div className={styles.pri} style={{ background: s.bg, color: s.fg, borderColor: s.br }}>
                  {a.priority}
                </div>
              </div>
              <div className={styles.body}>{a.body}</div>
              <div className={styles.bottomRow}>
                <div className={styles.date}>🗓️ {a.date}</div>
                <button className={styles.linkBtn} onClick={() => alert('Read (mock)')}>
                  Read more
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

