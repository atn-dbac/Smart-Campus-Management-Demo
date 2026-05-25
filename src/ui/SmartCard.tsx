import React from 'react'
import styles from './smartCard.module.css'

export function SmartCard({ children }: { children: React.ReactNode }) {
  return <section className={styles.card}>{children}</section>
}

