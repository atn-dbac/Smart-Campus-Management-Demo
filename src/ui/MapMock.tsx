import React from 'react'
import styles from './mapMock.module.css'

const buildings = [
  { id: 'lib', name: 'Library', x: 30, y: 45 },
  { id: 'eng', name: 'Engineering', x: 55, y: 30 },
  { id: 'med', name: 'Medical', x: 70, y: 60 },
  { id: 'hall', name: 'Main Hall', x: 35, y: 65 },
]

export function MapMock() {
  return (
    <div className={styles.wrap}>
      <div className={styles.map} role="img" aria-label="Mock campus map">
        <div className={styles.grid} aria-hidden="true" />
        {buildings.map((b) => (
          <button
            key={b.id}
            className={styles.poi}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            title={b.name}
            onClick={() => alert(`${b.name} (mock)`)}
          />
        ))}
        <div className={styles.centerLabel}>Central Quad</div>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendTitle}>Points of Interest</div>
        <ul className={styles.legendList}>
          {buildings.map((b) => (
            <li key={b.id} className={styles.legendItem}>
              <span className={styles.dot} aria-hidden="true" /> {b.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

