import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchNotices } from '../services/api'
import { IconBell, IconCalendar, IconChevronRight } from '../components/Icons'

export default function NoticeDetail() {
  const { id } = useParams()
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    fetchNotices().then(notices => {
      const found = notices.find(n => n.id === parseInt(id)) || notices[0]
      setNotice(found)
    })
  }, [id])

  if (!notice) {
    return <div className="section-padding container"><p>Loading notice...</p></div>
  }

  return (
    <div className="section-padding">
      <div className="container" style={{ maxWidth: '850px' }}>
        <Link to="/notices" className="btn-outline" style={{ marginBottom: '24px' }}>
          ← Back to All Notices
        </Link>

        <div className="glass-panel" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            {notice.is_urgent && <span className="badge badge-urgent">URGENT CIRCULAR</span>}
            <span className="badge badge-blue">{notice.category}</span>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Reference ID: MU-CSE-SOC-2026/{notice.id}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#fff', marginBottom: '18px', lineHeight: 1.3 }}>
            {notice.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.9rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px', marginBottom: '25px' }}>
            <IconCalendar className="w-4 h-4" style={{ color: '#fbbf24' }} /> Date of Issue: <strong>{notice.published_date}</strong>
          </div>

          <div style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '40px' }}>
            <p style={{ marginBottom: '20px' }}>{notice.content}</p>
            <p style={{ marginBottom: '20px' }}>
              All concerned students, mentors, and society committee members are requested to take necessary preparations accordingly. For further queries, please reach out to the General Secretary or Department Office.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>Executive Office</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>MU CSE Society • Metropolitan University</div>
            </div>
            <button
              onClick={() => window.print()}
              className="btn-outline"
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
