import React, { useState } from 'react'
import { IconMail, IconMapPin, IconClock, IconCheck } from '../components/Icons'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <div className="badge badge-yellow" style={{ marginBottom: '10px' }}>Get in Touch</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            Contact MU CSE Society
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' }}>
            Have questions about upcoming contests, workshops, or club membership? Reach out to our executive desk or send us a message below.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
          {/* Contact Information & Office Details */}
          <div>
            <div className="glass-panel" style={{ padding: '35px', marginBottom: '25px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
                Office Location & Contacts
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <IconMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Campus Address:</strong>
                    <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
                      Room 402, Academic Building 1, Department of CSE, Metropolitan University, Bateshwar, Sylhet-3103, Bangladesh.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <IconMail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Direct Email:</strong>
                    <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
                      cse.society@metrouni.edu.bd<br />
                      president.csesoc@mu.edu.bd
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <IconClock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Help Desk Hours:</strong>
                    <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
                      Sunday to Thursday: 10:00 AM – 04:30 PM (Except university holidays)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '15px' }}>Frequently Asked Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <strong style={{ color: '#fbbf24', fontSize: '0.9rem' }}>Q: Who can join the MU CSE Society?</strong>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                    All currently enrolled undergraduate and graduate students of the Department of CSE are eligible.
                  </p>
                </div>
                <div>
                  <strong style={{ color: '#38bdf8', fontSize: '0.9rem' }}>Q: How do I participate in ICPC coaching?</strong>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                    Attend our weekly intra-department contests announced in the Notice section and register your team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Send an Inquiry
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '25px' }}>
              Our executive communications team will respond to your registered student email within 24 hours.
            </p>

            {submitted ? (
              <div style={{ background: 'rgba(52, 211, 153, 0.15)', border: '1px solid #34d399', padding: '24px', borderRadius: '14px', color: '#34d399', textAlign: 'center' }}>
                <IconCheck className="w-10 h-10" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '6px' }}>Message Received!</h3>
                <p style={{ fontSize: '0.9rem', color: '#a7f3d0' }}>
                  Thank you, {formData.name}. We have logged your query and will reply via {formData.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Rahman"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. student@metrouni.edu.bd"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Topic / Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Workshop Registration Query"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Message Details</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', outline: 'none' }}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '14px', marginTop: '10px' }}>
                  Send Message to Society Desk
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
