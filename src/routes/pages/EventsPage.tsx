import React from 'react'
import { SmartCard } from '../../ui/SmartCard'
import { EventsFeedMock } from '../../ui/EventsFeedMock'

export function EventsPage() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0, fontSize: 26, letterSpacing: 0.2 }}>Events</h1>
      <SmartCard>
        <EventsFeedMock />
      </SmartCard>
    </div>
  )
}

