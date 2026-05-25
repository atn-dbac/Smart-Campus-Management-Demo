import React, { useMemo, useState } from 'react'
import styles from './timetableMock.module.css'

type Slot = { time: string; course: string; location: string; type: 'Lecture' | 'Lab' | 'Tutorial' }

const allSlotsByDay: Record<string, Slot[]> = {
  Monday: [
    { time: '09:00 - 10:30', course: 'CS-201 Data Structures', location: 'Eng 2.14', type: 'Lecture' },
    { time: '11:00 - 12:30', course: 'MA-110 Discrete Math', location: 'Lib 1.09', type: 'Tutorial' },
    { time: '14:00 - 15:30', course: 'EE-210 Circuits Lab', location: 'Med 0.02', type: 'Lab' },
  ],
  Tuesday: [
    { time: '10:00 - 11:30', course: 'CS-250 Web Engineering', location: 'Hall 3.05', type: 'Lecture' },
    { time: '12:00 - 13:00', course: 'CS-250 Studio', location: 'Eng 1.07', type: 'Lab' },
  ],
  Wednesday: [
    { time: '09:30 - 11:00', course: 'AI-101 Foundations', location: 'Hall 2.10', type: 'Lecture' },
    { time: '11:30 - 13:00', course: 'AI-101 Lab', location: 'Eng 0.12', type: 'Lab' },
  ],
  Thursday: [
    { time: '10:00 - 11:30', course: 'DB-130 Databases', location: 'Lib 2.18', type: 'Lecture' },
    { time: '12:30 - 14:00', course: 'DB-130 Tutorial', location: 'Lib 1.06', type: 'Tutorial' },
  ],
  Friday: [
    { time: '09:00 - 10:15', course: 'Project Mentoring', location: 'Main Hall', type: 'Tutorial' },
  ],
}

function badgeColor(type: Slot['type']) {
  switch (type) {
    case 'Lecture':
      return { bg: 'rgba(61,214,255,.18)', fg: '#bfeeff', br: 'rgba(61,214,255,.45)' }
    case 'Lab':
      return { bg: 'rgba(108,76,255,.18)', fg: '#d8ccff', br: 'rgba(108,76,255,.45)' }
    case 'Tutorial':
      return { bg: 'rgba(255,255,255,.08)', fg: 'rgba(232,238,252,.9)', br: 'rgba(255,255,255,.25)' }
  }
}

export function TimetableMock() {
  const [day, setDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday')
  const slots = useMemo(() => allSlotsByDay[day] ?? [], [day])

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label="Days">
        {Object.keys(allSlotsByDay).map((d) => {
          const active = d === day
          return (
            <button
              key={d}
              className={active ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              onClick={() => setDay(d as any)}
              role="tab"
              aria-selected={active}
            >
              {d}
            </button>
          )
        })}
      </div>

      <div className={styles.list}>
        {slots.length === 0 ? (
          <div className={styles.empty}>No classes for {day}.</div>
        ) : (
          slots.map((s) => {
            const c = badgeColor(s.type)
            return (
              <div key={s.course + s.time} className={styles.slot}>
                <div className={styles.time}>{s.time}</div>
                <div className={styles.body}>
                  <div className={styles.row1}>
                    <div className={styles.course}>{s.course}</div>
                    <div className={styles.badge} style={{ background: c.bg, color: c.fg, borderColor: c.br }}>
                      {s.type}
                    </div>
                  </div>
                  <div className={styles.location}>📍 {s.location}</div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

