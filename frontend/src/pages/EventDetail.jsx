import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchEvents } from '../services/api'
import { IconCalendar, IconClock, IconMapPin, IconCheck, IconChevronRight } from '../components/Icons'

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [registered, setRegistered] = useState(false)
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetchEvents().then(events => {
      const found = events.find(e => e.id === parseInt(id)) || events[0]
      setEvent(found)
    })
  }, [id])

  const handleRegister = (e) => {
    e.preventDefault()
    if (!name || !studentId || !email) return
    setRegistered(true)
  }

  if (!event) {
    return <div className="section-padding container"><p>Loading event details...</p></div>
  }

  return (
    <div className="section-padding">
      <div className="container" style={{ maxWidth: '900px' }}>
        <Link to="/events" className="btn-outline" style={{ marginBottom: '24px' }}>
          ← Back to All Events
        </Link>

        <div className="glass-panel" style={{ overflow: 'hidden', padding: '0' }}>
          <img src={event.image_url} alt={event.title} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />

          <div style={{ padding: '35px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
              <span className="badge badge-yellow">{event.category}</span>
              <span className="badge badge-blue">Official Society Event</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
              {event.title}
            </h1>

            {/* Quick Meta Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', marginBottom: '4px' }}>
                  <IconCalendar className="w-4 h-4" /> <strong>Event Date</strong>
                </div>
                <div style={{ color: '#fff' }}>{event.date}</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '4px' }}>
                  <IconClock className="w-4 h-4" /> <strong>Timing</strong>
                </div>
                <div style={{ color: '#fff' }}>{event.time}</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', marginBottom: '4px' }}>
                  <IconMapPin className="w-4 h-4" /> <strong>Location</strong>
                </div>
                <div style={{ color: '#fff' }}>{event.venue}</div>
              </div>
            </div>

            {/* Event Description */}
            <div style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '40px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700, marginBottom: '14px' }}>About This Event</h3>
              <p style={{ marginBottom: '16px' }}>{event.description}</p>
              <p>
                Participants will gain deep theoretical insights alongside practical code walkthroughs. Refreshments, certificates of participation, and networking with senior mentors and instructors will be provided.
              </p>
            </div>

            {/* Registration Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15), rgba(245, 158, 11, 0.1))',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '16px',
              padding: '30px'
            }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
                Join & Register for this Event
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '20px' }}>
                Registration is open for all Metropolitan University students. Limited seats available.
              </p>

              {registered ? (
                <div style={{ background: 'rgba(52, 211, 153, 0.15)', border: '1px solid #34d399', padding: '18px 24px', borderRadius: '12px', color: '#34d399', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IconCheck className="w-6 h-6" />
                  <div>
                    <strong>Registration Successful!</strong>
                    <div style={{ fontSize: '0.88rem', color: '#a7f3d0' }}>We have registered {name} ({studentId}). See you at the event!</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegister} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
                  />
                  <input
                    type="text"
                    placeholder="Student ID (e.g. 211-115-001)"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
                  />
                  <input
                    type="email"
                    placeholder="Student Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '12px' }}>
                    Confirm Seat Registration
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
