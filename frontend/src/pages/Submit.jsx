import React, { useState } from 'react'
import { submitEntry } from '../services/api'
import { IconUpload, IconCheck } from '../components/Icons'

export default function Submit() {
  const [submissionType, setSubmissionType] = useState('event')
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    submitter_name: '',
    submitter_email: '',
    submitter_student_id: ''
  })
  const [statusMsg, setStatusMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const types = [
    { id: 'event', label: 'Event Proposal' },
    { id: 'notice', label: 'Department Notice' },
    { id: 'blog', label: 'Tech Article / Blog' },
    { id: 'alumni', label: 'Alumni Profile' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatusMsg(null)

    try {
      const res = await submitEntry({
        submission_type: submissionType,
        ...formData
      })
      setStatusMsg({
        type: 'success',
        text: res.message || 'Your submission has been received and queued for admin review!'
      })
      setFormData({
        title: '',
        details: '',
        submitter_name: '',
        submitter_email: '',
        submitter_student_id: ''
      })
    } catch {
      setStatusMsg({
        type: 'error',
        text: 'Failed to process submission. Please verify your connection.'
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="section-padding">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-yellow" style={{ marginBottom: '10px' }}>Member Submissions</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            Submit Content for Admin Review
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' }}>
            Contribute to MU CSE Society by proposing an event, publishing an article, circular, or adding your alumni profile.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '40px' }}>
          {/* Submission Type Selector */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px' }}>
              Select Submission Category:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
              {types.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSubmissionType(t.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    background: submissionType === t.id ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'rgba(255, 255, 255, 0.04)',
                    color: submissionType === t.id ? '#fff' : '#94a3b8',
                    border: submissionType === t.id ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.2s'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {statusMsg && (
            <div style={{
              background: statusMsg.type === 'success' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${statusMsg.type === 'success' ? '#34d399' : '#f87171'}`,
              color: statusMsg.type === 'success' ? '#34d399' : '#f87171',
              padding: '16px 20px',
              borderRadius: '12px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <IconCheck className="w-5 h-5" />
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                Title / Headline *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Competitive Programming Workshop on Segment Trees"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                Full Description / Article Content *
              </label>
              <textarea
                rows="6"
                required
                placeholder="Provide detailed breakdown, proposed agenda, draft content, or profile achievements..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
              ></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Das"
                  value={formData.submitter_name}
                  onChange={(e) => setFormData({ ...formData, submitter_name: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Student Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@metrouni.edu.bd"
                  value={formData.submitter_email}
                  onChange={(e) => setFormData({ ...formData, submitter_email: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Student ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 211-115-001"
                  value={formData.submitter_student_id}
                  onChange={(e) => setFormData({ ...formData, submitter_student_id: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{ padding: '14px', marginTop: '10px', opacity: submitting ? 0.7 : 1 }}
            >
              <IconUpload className="w-5 h-5" />
              {submitting ? 'Submitting...' : 'Submit to Admin Review Board'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
