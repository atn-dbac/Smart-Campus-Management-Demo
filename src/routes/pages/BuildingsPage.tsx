import React from 'react'
import { SmartCard } from '../../ui/SmartCard'
import { ShuttleTrackerMock } from '../../ui/ShuttleTrackerMock'

export function BuildingsPage() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0, fontSize: 26, letterSpacing: 0.2 }}>Buildings</h1>
      <SmartCard>
        <ShuttleTrackerMock />
      </SmartCard>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        <SmartCard>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Live shuttle updates</div>
          <div style={{ color: 'rgba(232,238,252,.75)' }}>
            Mock real-time shuttle positions with pause/resume and shuttle filters.
          </div>
        </SmartCard>
        <SmartCard>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Stop locations</div>
          <div style={{ color: 'rgba(232,238,252,.75)' }}>
            Central Quad, Library, Engineering, Medical Center, and Main Hall.
          </div>
        </SmartCard>
      </div>
    </div>
  )
}


