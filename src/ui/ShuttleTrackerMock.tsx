import React, { useEffect, useMemo, useState } from 'react'
import styles from './shuttleTrackerMock.module.css'

type Stop = { id: string; name: string; x: number; y: number }

type Shuttle = {
  id: string
  name: string
  color: string
  stops: string[]
  // progress 0..1 between current segment
  segmentIndex: number
  segmentProgress: number
  direction: 1 | -1
}

const stops: Stop[] = [
  { id: 'quad', name: 'Central Quad', x: 50, y: 52 },
  { id: 'lib', name: 'Library', x: 30, y: 40 },
  { id: 'eng', name: 'Engineering', x: 62, y: 28 },
  { id: 'hall', name: 'Main Hall', x: 35, y: 66 },
  { id: 'med', name: 'Medical Center', x: 72, y: 60 },
]

function byId(id: string) {
  const s = stops.find((x) => x.id === id)
  if (!s) throw new Error(`Unknown stop: ${id}`)
  return s
}

function buildPathFor(shuttle: Shuttle) {
  const pts = shuttle.stops.map((sid) => byId(sid))
  // Create simple polyline points (in % coordinates)
  return pts.map((p) => ({ x: p.x, y: p.y }))
}

function toSvgPolyline(points: { x: number; y: number }[]) {
  return points.map((p) => `${p.x},${p.y}`).join(' ')
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function computeBusPosition(shuttle: Shuttle) {
  const pathIds = shuttle.stops
  const segmentCount = pathIds.length - 1
  const dir = shuttle.direction

  // segmentIndex indicates current segment along forward/backward order
  // Convert to indices in pathIds
  const idxA = dir === 1 ? shuttle.segmentIndex : pathIds.length - 1 - shuttle.segmentIndex
  const idxB = dir === 1 ? shuttle.segmentIndex + 1 : pathIds.length - 2 - shuttle.segmentIndex

  const a = byId(pathIds[idxA])
  const b = byId(pathIds[idxB])

  const x = lerp(a.x, b.x, shuttle.segmentProgress)
  const y = lerp(a.y, b.y, shuttle.segmentProgress)
  return { x, y }
}

export function ShuttleTrackerMock() {
  const [active, setActive] = useState<'All' | 'Shuttle A' | 'Shuttle B'>('All')
  const [live, setLive] = useState(true)

  const initial = useMemo<Shuttle[]>(
    () => [
      {
        id: 'A',
        name: 'Shuttle A',
        color: 'rgba(61,214,255,.95)',
        stops: ['quad', 'lib', 'eng', 'quad', 'med', 'hall', 'quad'],
        segmentIndex: 0,
        segmentProgress: 0.15,
        direction: 1,
      },
      {
        id: 'B',
        name: 'Shuttle B',
        color: 'rgba(108,76,255,.95)',
        stops: ['hall', 'quad', 'med', 'eng', 'lib', 'quad'],
        segmentIndex: 1,
        segmentProgress: 0.45,
        direction: -1,
      },
    ],
    []
  )

  const [shuttles, setShuttles] = useState<Shuttle[]>(initial)

  useEffect(() => {
    if (!live) return
    const interval = window.setInterval(() => {
      setShuttles((prev) =>
        prev.map((s) => {
          const segCount = s.stops.length - 1
          if (segCount <= 0) return s

          const speed = s.id === 'A' ? 0.012 : 0.009
          let segmentProgress = s.segmentProgress + speed
          let segmentIndex = s.segmentIndex
          let direction = s.direction

          // When reaching end of segment, advance segment.
          while (segmentProgress >= 1) {
            segmentProgress -= 1
            // advance one segment in travel direction
            if (direction === 1) {
              segmentIndex += 1
              if (segmentIndex >= segCount) {
                segmentIndex = segCount - 1
                direction = -1
              }
            } else {
              segmentIndex -= 1
              if (segmentIndex < 0) {
                segmentIndex = 0
                direction = 1
              }
            }
          }

          return { ...s, segmentIndex, segmentProgress: clamp(segmentProgress, 0, 1), direction }
        })
      )
    }, 250)

    return () => window.clearInterval(interval)
  }, [live])

  const visible = useMemo(() => {
    if (active === 'All') return shuttles
    return shuttles.filter((s) => s.name === active)
  }, [active, shuttles])

  const kpis = useMemo(() => {
    const nextStopName = (s: Shuttle) => {
      const segCount = s.stops.length - 1
      const dir = s.direction
      const nextIdx =
        dir === 1
          ? Math.min(s.segmentIndex + 1, segCount)
          : Math.max(s.stops.length - 2 - s.segmentIndex - 1, 0)

      const id = s.stops[dir === 1 ? s.segmentIndex + 1 : s.stops.length - 2 - s.segmentIndex]
      return byId(id).name
    }

    const count = visible.length
    const next = visible[0] ? nextStopName(visible[0]) : '—'
    return {
      activeBuses: count,
      nextStop: next,
      eta: count ? '2–6 min' : '—',
    }
  }, [visible])

  return (
    <div className={styles.wrap}>
      <div className={styles.tracker}>
        <div className={styles.panel}>
          <div className={styles.title}>Live Shuttle Tracker</div>
          <div className={styles.sub}>
            Mock real-time positions. Toggle a shuttle to focus, and pause/resume live updates.
          </div>

          <div className={styles.controls} style={{ marginTop: 8 }}>
            {(['All', 'Shuttle A', 'Shuttle B'] as const).map((x) => (
              <button
                key={x}
                className={active === x ? `${styles.btn} ${styles.btnActive}` : styles.btn}
                onClick={() => setActive(x)}
              >
                {x}
              </button>
            ))}

            <button
              className={live ? `${styles.btn} ${styles.btnActive}` : styles.btn}
              onClick={() => setLive((v) => !v)}
              title="Pause or resume updates"
            >
              {live ? 'Live: On' : 'Live: Paused'}
            </button>
          </div>

          <div className={styles.kpis} style={{ marginTop: 12 }}>
            <div className={styles.kpi}>
              <div className={styles.kpiLabel}>Active shuttles</div>
              <div className={styles.kpiValue}>{kpis.activeBuses}</div>
            </div>
            <div className={styles.kpi}>
              <div className={styles.kpiLabel}>Next stop (shown)</div>
              <div className={styles.kpiValue}>{kpis.nextStop}</div>
            </div>
          </div>

          <div className={styles.notice} style={{ marginTop: 10 }}>
            Tip: click a stop label below to highlight where your shuttle will arrive next.
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.title} style={{ fontSize: 16 }}>
            Stops
          </div>
          <div className={styles.feed}>
            {stops.map((s) => (
              <div key={s.id} className={styles.cardRow}>
                <div>
                  <div className={styles.badge} style={{ borderColor: 'rgba(61,214,255,.25)' }}>
                    {s.name}
                  </div>
                  <div className={styles.small} style={{ marginTop: 6 }}>
                    Platform: {s.id.toUpperCase()}
                  </div>
                </div>
                <div className={styles.badge} style={{ background: 'rgba(0,0,0,.16)' }}>
                  {kpis.eta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SmartMap shuttles={visible} />
    </div>
  )
}

function SmartMap({ shuttles }: { shuttles: Shuttle[] }) {
  return (
    <div className={styles.map}>
      <div className={styles.grid} />
      <svg className={styles.route} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {shuttles.map((s) => {
          const pts = buildPathFor(s)
          const poly = toSvgPolyline(pts)
          return (
            <g key={s.id}>
              <polyline className={styles.poly} points={poly} />
              <polyline className={styles.polyGlow} points={poly} />
            </g>
          )
        })}
      </svg>

      {stops.map((s) => (
        <div key={s.id} className={styles.stop} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
          <div className={styles.stopLabel}>{s.name}</div>
        </div>
      ))}

      {shuttles.map((s) => {
        const pos = computeBusPosition(s)
        return (
          <div
            key={s.id}
            className={styles.bus}
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, borderColor: s.color, background: 'rgba(255,255,255,.95)' }}
            title={`${s.name} (mock)`}
          >
            <div className={styles.busInner} style={{ background: s.color }} />
            <div className={styles.busTag} style={{ borderColor: 'rgba(255,255,255,.10)' }}>
              {s.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}

