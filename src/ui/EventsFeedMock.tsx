import React from 'react'
import styles from './eventsFeedMock.module.css'

type EventItem = { title: string; when: string; where: string; tag: 'Workshop' | 'Seminar' | 'Sports' }


const events: EventItem[] = [
  { title: 'AI for Everyone', when: 'Tue 6:00 PM', where: 'Hall 2.10', tag: 'Seminar' },
  { title: 'React Smart UIs', when: 'Thu 4:30 PM', where: 'Eng 1.07', tag: 'Workshop' },
  { title: 'Campus Football League', when: 'Sat 10:00 AM', where: 'Central Field', tag: 'Sports' },
]

const tagStyles: Record<EventItem['tag'], { bg: string; fg: string; br: string }> = {
  Workshop: { bg: 'rgba(61,214,255,.18)', fg: '#bfeeff', br: 'rgba(61,214,255,.45)' },
  Seminar: { bg: 'rgba(108,76,255,.18)', fg: '#d8ccff', br: 'rgba(108,76,255,.45)' },
  Sports: { bg: 'rgba(255,255,255,.08)', fg: 'rgba(232,238,252,.9)', br: 'rgba(255,255,255,.25)' },
}

export function EventsFeedMock() {
  return (
    <div className={styles.wrap}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.kicker}>This week</div>
          <div className={styles.title}>Upcoming events</div>
        </div>
        <div className={styles.actions}>
          <button className={styles.btn} onClick={() => alert('Subscribed (mock)')}>
            Subscribe
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {events.map((e) => {
          const s = tagStyles[e.tag]
          return (
            <article key={e.title} className={styles.item}>
              <div className={styles.itemTop}>
                <div className={styles.itemTitle}>{e.title}</div>
                <div className={styles.tag} style={{ background: s.bg, color: s.fg, borderColor: s.br }}>
                  {e.tag}
                </div>
              </div>
              <div className={styles.meta}>🕒 {e.when}</div>
              <div className={styles.meta}>📍 {e.where}</div>
              <div className={styles.bottom}>
                <button className={styles.smallBtn} onClick={() => alert('Details (mock)')}>
                  View
                </button>
                <button className={styles.smallBtnGhost} onClick={() => alert('RSVP (mock)')}>
                  RSVP
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

