import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchAlumni } from '../services/api'
import { IconLinkedin, IconGithub, IconMapPin } from '../components/Icons'

export default function AlumniDetail() {
  const { id } = useParams()
  const [alumnus, setAlumnus] = useState(null)

  useEffect(() => {
    fetchAlumni().then(list => {
      const found = list.find(a => a.id === parseInt(id)) || list[0]
      setAlumnus(found)
    })
  }, [id])

  if (!alumnus) {
    return <div className="section-padding container"><p>Loading profile...</p></div>
  }

  return (
    <div className="section-padding">
      <div className="container" style={{ maxWidth: '850px' }}>
        <Link to="/alumni" className="btn-outline" style={{ marginBottom: '24px' }}>
          ← Back to Alumni Directory
        </Link>

        <div className="glass-panel" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '30px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '30px' }}>
            <img
              src={alumnus.image_url}
              alt={alumnus.name}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #38bdf8'
              }}
            />
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '8px' }}>{alumnus.batch}</span>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{alumnus.name}</h1>
              <div style={{ fontSize: '1.1rem', color: '#fbbf24', fontWeight: 600, marginBottom: '6px' }}>
                {alumnus.current_role} @ {alumnus.company}
              </div>
              <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Based in {alumnus.location}</div>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>Words of Wisdom for Juniors</h3>
            <blockquote style={{
              background: 'rgba(2, 132, 199, 0.1)',
              borderLeft: '4px solid #38bdf8',
              padding: '20px 24px',
              borderRadius: '0 12px 12px 0',
              fontStyle: 'italic',
              color: '#e2e8f0',
              lineHeight: '1.8',
              fontSize: '1.05rem'
            }}>
              "{alumnus.quote}"
            </blockquote>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            {alumnus.linkedin && (
              <a href={alumnus.linkedin} target="_blank" rel="noreferrer" className="btn-primary">
                <IconLinkedin className="w-4 h-4" /> Connect on LinkedIn
              </a>
            )}
            {alumnus.github && (
              <a href={alumnus.github} target="_blank" rel="noreferrer" className="btn-outline">
                <IconGithub className="w-4 h-4" /> GitHub Profile
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
