import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SmartcampusLayout from './SmartcampusLayout'
import { BuildingsPage } from './pages/BuildingsPage'
import { TimetablePage } from './pages/TimetablePage'
import { EventsPage } from './pages/EventsPage'
import { AnnouncementsPage } from './pages/AnnouncementsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SmartcampusLayout />}>
        <Route index element={<Navigate to="/buildings" replace />} />
        <Route path="buildings" element={<BuildingsPage />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/buildings" replace />} />
    </Routes>
  )
}

