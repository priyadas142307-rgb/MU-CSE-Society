import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAlumni } from '../services/api'
import { IconLinkedin, IconGithub, IconMapPin, IconSearch } from '../components/Icons'

export default function Alumni() {
  const [alumni, setAlumni] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchAlumni().then(setAlumni)
  }, [])

  const filtered = alumni.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.company.toLowerCase().includes(search.toLowerCase()) ||
    a.current_role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <div className="badge badge-yellow" style={{ marginBottom: '10px' }}>Global Alumni Network</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            MU CSE Alumni
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' }}>
            Discover our graduates making waves at top global tech companies, innovative startups, research institutions, and open-source foundations.
          </p>
        </div>

        {/* Search */}
        <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
          <input
            type="text"
            placeholder="Search alumni by name, company, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
          />
        </div>

        {/* Alumni Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {filtered.map(person => (
            <div key={person.id} className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '18px' }}>
                <img
                  src={person.image_url}
                  alt={person.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #38bdf8'
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    {person.name}
                  </h3>
                  <div style={{ color: '#fbbf24', fontSize: '0.88rem', fontWeight: 600 }}>
                    {person.current_role}
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
                    @ <strong style={{ color: '#fff' }}>{person.company}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span className="badge badge-blue">{person.batch}</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <IconMapPin className="w-3.5 h-3.5" /> {person.location}
                </span>
              </div>

              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '20px', flex: 1 }}>
                "{person.quote}"
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {person.linkedin && (
                    <a href={person.linkedin} target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>
                      <IconLinkedin className="w-4 h-4" />
                    </a>
                  )}
                  {person.github && (
                    <a href={person.github} target="_blank" rel="noreferrer" style={{ color: '#cbd5e1' }}>
                      <IconGithub className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <Link to={`/alumni/${person.id}`} className="btn-outline" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
                  Story Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
