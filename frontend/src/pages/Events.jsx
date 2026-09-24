import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchEvents } from '../services/api'
import { IconCalendar, IconClock, IconMapPin, IconSearch, IconChevronRight } from '../components/Icons'

export default function Events() {
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetchEvents().then(setEvents)
  }, [])

  const categories = ['All', 'Workshop', 'Contest', 'Seminar', 'Fest']

  const filteredEvents = events.filter(ev => {
    const matchesCat = selectedCategory === 'All' || ev.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = ev.title.toLowerCase().includes(search.toLowerCase()) || ev.description.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="section-padding">
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
          <div className="badge badge-yellow" style={{ marginBottom: '10px' }}>Society Activities</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            Events, Workshops & Contests
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' }}>
            Explore upcoming hackathons, competitive programming contests, technical bootcamps, and networking seminars.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel" style={{ padding: '18px 24px', marginBottom: '40px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  background: selectedCategory === cat ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === cat ? '#0f172a' : '#cbd5e1',
                  border: selectedCategory === cat ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <IconSearch className="w-4 h-4" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '10px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Events Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {filteredEvents.map(event => (
            <div key={event.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', position: 'relative' }}>
                <img src={event.image_url} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="badge badge-blue" style={{ position: 'absolute', top: '14px', right: '14px' }}>
                  {event.category}
                </span>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                  {event.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                  {event.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '15px', color: '#cbd5e1', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconCalendar className="w-4 h-4" style={{ color: '#fbbf24' }} /> {event.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconClock className="w-4 h-4" style={{ color: '#38bdf8' }} /> {event.time}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconMapPin className="w-4 h-4" style={{ color: '#34d399' }} /> {event.venue}
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <Link to={`/events/${event.id}`} className="btn-primary" style={{ width: '100%' }}>
                    View Details & Register
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>No events found matching your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
