import React from 'react'
import { SmartCard } from '../../ui/SmartCard'
import { TimetableMock } from '../../ui/TimetableMock'

export function TimetablePage() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0, fontSize: 26, letterSpacing: 0.2 }}>Timetable</h1>
      <SmartCard>
        <TimetableMock />
      </SmartCard>
    </div>
  )
}

