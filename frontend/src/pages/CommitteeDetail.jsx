import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchCommittee } from '../services/api'
import { IconMail, IconLinkedin, IconGithub, IconAward } from '../components/Icons'

export default function CommitteeDetail() {
  const { id } = useParams()
  const [member, setMember] = useState(null)

  useEffect(() => {
    fetchCommittee().then(members => {
      const found = members.find(m => m.id === parseInt(id)) || members[0]
      setMember(found)
    })
  }, [id])

  if (!member) {
    return <div className="section-padding container"><p>Loading profile...</p></div>
  }

  return (
    <div className="section-padding">
      <div className="container" style={{ maxWidth: '850px' }}>
        <Link to="/committee" className="btn-outline" style={{ marginBottom: '24px' }}>
          ← Back to Committee List
        </Link>

        <div className="glass-panel" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '30px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '30px' }}>
            <img
              src={member.image_url}
              alt={member.name}
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #fbbf24',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
              }}
            />
            <div>
              <span className="badge badge-yellow" style={{ marginBottom: '8px' }}>{member.academic_year} Committee</span>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{member.name}</h1>
              <div style={{ fontSize: '1.1rem', color: '#38bdf8', fontWeight: 600, marginBottom: '6px' }}>{member.role}</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{member.department} • Session {member.session}</div>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Biography & Responsibilities</h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '1rem' }}>
              {member.bio}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {member.email && (
              <a href={`mailto:${member.email}`} className="btn-secondary">
                <IconMail className="w-4 h-4" /> Email {member.name.split(' ')[0]}
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="btn-outline">
                <IconLinkedin className="w-4 h-4" /> LinkedIn Profile
              </a>
            )}
            {member.github && (
              <a href={member.github} target="_blank" rel="noreferrer" className="btn-outline">
                <IconGithub className="w-4 h-4" /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
