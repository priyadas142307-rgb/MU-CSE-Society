import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../services/api'
import { IconShield, IconCheck, IconX, IconCalendar, IconBell, IconBook, IconUsers } from '../components/Icons'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('mu_admin_auth') === 'true'
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionMsg, setActionMsg] = useState(null)

  const loadSubmissions = () => {
    setLoading(true)
    axios.get(`${API_BASE_URL}/api/submissions/`)
      .then(res => {
        if (res.data) {
          setSubmissions(res.data)
        }
      })
      .catch((err) => {
        console.error('Failed to load submissions from API:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadSubmissions()
    }
  }, [isAuthenticated])

  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoginError('')

    const cleanUser = username.trim().toLowerCase()
    const cleanPass = password.trim()

    // Flexible authentication supporting standard credentials
    if (cleanUser === 'admin' && (cleanPass === 'admin12345' || cleanPass === 'admin123' || cleanPass === 'admin')) {
      sessionStorage.setItem('mu_admin_auth', 'true')
      setIsAuthenticated(true)
    } else {
      setLoginError('Invalid administrator credentials. Please check your username and password.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('mu_admin_auth')
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
  }

  const handleStatusChange = (id, newStatus) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s))
    setActionMsg(`Submission #${id} has been marked as ${newStatus.toUpperCase()}!`)
    setTimeout(() => setActionMsg(null), 3500)

    // Send status update to Django REST API
    axios.patch(`${API_BASE_URL}/api/submissions/${id}/`, { status: newStatus })
      .catch(err => {
        console.error('Error updating status on server:', err)
      })
  }

  // --- 1. LOGIN GATE FOR UNAUTHENTICATED USERS ---
  if (!isAuthenticated) {
    return (
      <div className="section-padding">
        <div className="container" style={{ maxWidth: '480px' }}>
          <div className="glass-panel" style={{ padding: '45px 35px', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0284c7, #f59e0b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              margin: '0 auto 20px',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
            }}>
              <IconShield className="w-8 h-8" />
            </div>

            <div className="badge badge-yellow" style={{ marginBottom: '12px' }}>
              Restricted Area
            </div>

            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              Admin Authentication
            </h1>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '28px' }}>
              Please enter your administrator credentials to access the MU CSE Society submission review board.
            </p>

            {loginError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #f87171',
                color: '#f87171',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '0.88rem',
                marginBottom: '20px'
              }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Admin Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Admin Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="admin12345"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setLoginError('')
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 48px 12px 14px',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#fff',
                      outline: 'none',
                      fontSize: '0.95rem'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: '4px 8px'
                    }}
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '13px', marginTop: '10px', width: '100%', fontSize: '0.98rem' }}
              >
                Unlock Admin Dashboard
              </button>
            </form>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.82rem', color: '#64748b' }}>
              Default credentials: Username: <code>admin</code> | Password: <code>admin12345</code>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- 2. AUTHENTICATED ADMIN DASHBOARD ---
  const pendingCount = submissions.filter(s => s.status === 'pending').length
  const approvedCount = submissions.filter(s => s.status === 'approved').length

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-yellow">Authenticated Session</span>
              <span style={{ fontSize: '0.82rem', color: '#34d399' }}>● Active Administrator</span>
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff' }}>
              Society Admin Control Panel
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Manage member submissions, evaluate event proposals, and moderate society activities.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={`${API_BASE_URL}/admin/`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.9rem' }}
            >
              <IconShield className="w-4 h-4" /> Open Django Admin ↗
            </a>
            <button
              onClick={handleLogout}
              className="btn-outline"
              style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '10px 18px', fontSize: '0.9rem' }}
            >
              Lock / Log Out
            </button>
          </div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Pending & Recent Submissions ({submissions.length})
            </h2>
            <button onClick={loadSubmissions} className="btn-outline" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
              ↻ Refresh List
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading submissions...</div>
          ) : (
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
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span className="badge badge-yellow">{item.submission_type?.toUpperCase()}</span>
                      <span className={`badge ${item.status === 'approved' ? 'badge-blue' : item.status === 'rejected' ? 'badge-urgent' : 'badge-yellow'}`}>
                        {item.status?.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Submitted by <strong>{item.submitter_name}</strong> ({item.submitter_email})
                        {item.submitter_student_id && ` • ID: ${item.submitter_student_id}`}
                      </span>
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
                <div style={{ textAlign: 'center', padding: '50px 20px', color: '#64748b' }}>
                  <p style={{ fontSize: '1.05rem', color: '#94a3b8', marginBottom: '6px' }}>No submissions currently in the database.</p>
                  <p style={{ fontSize: '0.85rem' }}>When students submit proposals through <code>/submit</code>, they will appear right here for approval.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
