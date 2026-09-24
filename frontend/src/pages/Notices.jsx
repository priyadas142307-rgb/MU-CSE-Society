import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchNotices } from '../services/api'
import { IconBell, IconSearch, IconChevronRight, IconCalendar } from '../components/Icons'

export default function Notices() {
  const [notices, setNotices] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    fetchNotices().then(setNotices)
  }, [])

  const categories = ['All', 'Recruitment', 'Contest', 'Publication', 'Department']

  const filtered = notices.filter(n => {
    const matchesCat = category === 'All' || n.category.toLowerCase() === category.toLowerCase()
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
          <div className="badge badge-urgent" style={{ marginBottom: '10px' }}>Notice Board</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            Official Society Notices & Circulars
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' }}>
            Stay informed with the latest administrative updates, competition calls, club recruitment notices, and academic bulletins.
          </p>
        </div>

        {/* Filter and Search */}
        <div className="glass-panel" style={{ padding: '18px 24px', marginBottom: '35px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  background: category === cat ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255, 255, 255, 0.05)',
                  color: category === cat ? '#0f172a' : '#cbd5e1',
                  border: category === cat ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
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
              placeholder="Search circulars..."
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

        {/* Notices List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map(notice => (
            <div key={notice.id} className="glass-panel" style={{ padding: '24px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', flex: 1, minWidth: '280px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: notice.is_urgent ? 'rgba(239, 68, 68, 0.15)' : 'rgba(2, 132, 199, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: notice.is_urgent ? '#f87171' : '#38bdf8',
                  flexShrink: 0
                }}>
                  <IconBell className="w-6 h-6" />
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                    {notice.is_urgent && <span className="badge badge-urgent">URGENT</span>}
                    <span className="badge badge-blue">{notice.category}</span>
                    <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <IconCalendar className="w-3.5 h-3.5" /> Published on {notice.published_date}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                    {notice.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {notice.content}
                  </p>
                </div>
              </div>

              <div>
                <Link to={`/notices/${notice.id}`} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
                  Full Notice <IconChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>No notices match your current search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
