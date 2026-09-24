import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchCommittee } from '../services/api'
import { IconMail, IconLinkedin, IconGithub, IconUsers } from '../components/Icons'

export default function Committee() {
  const [members, setMembers] = useState([])
  const [selectedYear, setSelectedYear] = useState('2025-2026')

  const academicYears = ['2025-2026', '2024-2025']

  useEffect(() => {
    fetchCommittee(selectedYear).then(setMembers)
  }, [selectedYear])

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <div className="badge badge-yellow" style={{ marginBottom: '10px' }}>Leadership & Administration</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            Executive Committee
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' }}>
            Meet the faculty advisors and student leaders steering the activities, technical workshops, and competitive programming initiatives of MU CSE Society.
          </p>
        </div>

        {/* Academic Year Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '45px' }}>
          {academicYears.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              style={{
                padding: '10px 24px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: 700,
                background: selectedYear === year ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                border: selectedYear === year ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: selectedYear === year ? '0 4px 15px rgba(2, 132, 199, 0.4)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              Academic Year {year}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {members.map(member => (
            <div key={member.id} className="glass-panel" style={{ padding: '30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', marginBottom: '18px' }}>
                <img
                  src={member.image_url}
                  alt={member.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid rgba(245, 158, 11, 0.5)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)'
                  }}
                />
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                {member.name}
              </h3>

              <div style={{ color: '#fbbf24', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                {member.role}
              </div>

              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '14px' }}>
                {member.department} • Session {member.session}
              </div>

              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                {member.bio}
              </p>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                {member.email && (
                  <a href={`mailto:${member.email}`} style={{ color: '#cbd5e1', padding: '6px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)' }}>
                    <IconMail className="w-4 h-4" />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', padding: '6px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)' }}>
                    <IconLinkedin className="w-4 h-4" />
                  </a>
                )}
                {member.github && (
                  <a href={member.github} target="_blank" rel="noreferrer" style={{ color: '#cbd5e1', padding: '6px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)' }}>
                    <IconGithub className="w-4 h-4" />
                  </a>
                )}
              </div>

              <Link to={`/committee/${member.id}`} className="btn-outline" style={{ width: '100%', fontSize: '0.85rem' }}>
                View Full Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
