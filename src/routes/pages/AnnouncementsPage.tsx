import React from 'react'
import { SmartCard } from '../../ui/SmartCard'
import { AnnouncementsMock } from '../../ui/AnnouncementsMock'

export function AnnouncementsPage() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0, fontSize: 26, letterSpacing: 0.2 }}>Announcements</h1>
      <SmartCard>
        <AnnouncementsMock />
      </SmartCard>
    </div>
  )
}

