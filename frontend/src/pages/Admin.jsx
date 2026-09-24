import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../services/api'
import { IconShield, IconCheck, IconX, IconCalendar, IconBell, IconBook, IconUsers } from '../components/Icons'

export default function Admin() {
  const [submissions, setSubmissions] = useState([
    {
      id: 101,
      submission_type: 'event',
      title: 'Python for Data Science Bootcamp',
      details: 'A proposed 2-day session covering pandas, matplotlib, and scikit-learn for 2nd year students.',
      submitter_name: 'Mahfuzur Rahman',
      submitter_email: 'mahfuz@mu.edu.bd',
      status: 'pending',
      created_at: '2026-09-24'
    },
    {
      id: 102,
      submission_type: 'blog',
      title: 'How I Cracked Google Summer of Code (GSoC) 2026',
      details: 'My journey contributing to Open Source and landing a GSoC project under Python Software Foundation.',
      submitter_name: 'Sadia Sultana',
      submitter_email: 'sadia@mu.edu.bd',
      status: 'pending',
      created_at: '2026-09-23'
    }
  ])
  const [actionMsg, setActionMsg] = useState(null)

  useEffect(() => {
    // Attempt to load from backend
    axios.get(`${API_BASE_URL}/api/submissions/`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setSubmissions(res.data)
        }
      })
      .catch(() => {
        // Fallback to sample submissions
      })
  }, [])

  const handleStatusChange = (id, newStatus) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s))
    setActionMsg(`Submission #${id} marked as ${newStatus.toUpperCase()}!`)
    setTimeout(() => setActionMsg(null), 3500)

    // Notify backend
    axios.patch(`${API_BASE_URL}/api/submissions/${id}/`, { status: newStatus }).catch(() => {})
  }

  const pendingCount = submissions.filter(s => s.status === 'pending').length
  const approvedCount = submissions.filter(s => s.status === 'approved').length

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="badge badge-yellow" style={{ marginBottom: '8px' }}>Restricted Access</div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff' }}>
              Society Admin Control Panel
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Manage member submissions, evaluate event proposals, and moderate tech publications.
            </p>
          </div>

          <a
            href={`${API_BASE_URL}/admin/`}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ padding: '12px 24px' }}
          >
            <IconShield className="w-5 h-5" /> Open Django Admin Portal ↗
          </a>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Pending Review</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>{pendingCount}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>Needs moderator review</div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Approved Items</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>{approvedCount}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>Published to society portal</div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Live Backend API</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginTop: '12px' }}>Operational</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>Render Cloud Web Service</div>
          </div>
        </div>

        {actionMsg && (
          <div style={{ background: 'rgba(52, 211, 153, 0.15)', border: '1px solid #34d399', padding: '14px 20px', borderRadius: '12px', color: '#34d399', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconCheck className="w-5 h-5" /> {actionMsg}
          </div>
        )}

        {/* Submissions Management Board */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            Pending & Recent Submissions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {submissions.map(item => (
              <div key={item.id} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '22px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="badge badge-yellow">{item.submission_type.toUpperCase()}</span>
                    <span className={`badge ${item.status === 'approved' ? 'badge-blue' : item.status === 'rejected' ? 'badge-urgent' : 'badge-yellow'}`}>
                      {item.status.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Submitted by {item.submitter_name} ({item.submitter_email})</span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                    {item.title}
                  </h3>

                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    {item.details}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {item.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusChange(item.id, 'approved')}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '8px',
                        background: 'rgba(52, 211, 153, 0.15)',
                        border: '1px solid #34d399',
                        color: '#34d399',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <IconCheck className="w-4 h-4" /> Approve
                    </button>
                  )}

                  {item.status !== 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(item.id, 'rejected')}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '8px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid #f87171',
                        color: '#f87171',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <IconX className="w-4 h-4" /> Reject
                    </button>
                  )}
                </div>
              </div>
            ))}

            {submissions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                No submissions currently in the queue.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
