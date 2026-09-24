import React from 'react'
import { Link } from 'react-router-dom'
import { IconAward, IconBook, IconCode, IconUsers, IconChevronRight } from '../components/Icons'

export default function About() {
  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
          <div className="badge badge-yellow" style={{ marginBottom: '12px' }}>About Our Organization</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Empowering CSE Students Since 2012
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.7' }}>
            MU CSE Society is the premier co-curricular and technical student body under the Department of Computer Science & Engineering at Metropolitan University, Sylhet.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          <div className="glass-panel" style={{ padding: '35px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fbbf24',
              marginBottom: '20px'
            }}>
              <IconAward className="w-6 h-6" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>Our Mission</h2>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '0.95rem' }}>
              To bridge the gap between classroom computer science theories and real-world technology demands through peer mentorship, coding contests, technical workshops, and collaboration with national and international tech companies.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '35px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(2, 132, 199, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
              marginBottom: '20px'
            }}>
              <IconCode className="w-6 h-6" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>Our Vision</h2>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '0.95rem' }}>
              To produce world-class software engineers, algorithmic researchers, and tech entrepreneurs who will lead technological advancement and represent Metropolitan University on national and global stages like ICPC and Google Summer of Code.
            </p>
          </div>
        </div>

        {/* Department Overview */}
        <div className="glass-panel" style={{ padding: '40px', marginBottom: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '35px', alignItems: 'center' }}>
            <div>
              <div className="badge badge-blue" style={{ marginBottom: '10px' }}>Academic Excellence</div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                Department of Computer Science & Engineering
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '20px' }}>
                The Department of CSE at Metropolitan University is known for its rigorous curriculum, modern computer laboratories, and distinguished faculty members. With specialized tracks in Artificial Intelligence, Software Engineering, and Cyber Security, the department ensures our graduates are prepared for high-impact careers.
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>1,200+</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Graduates Worldwide</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>6</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Advanced Specialized Labs</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399' }}>100%</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Industry-Aligned Syllabus</div>
                </div>
              </div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '30px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '15px' }}>
                Core Wings of the Society
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { title: "Competitive Programming Wing", desc: "Weekly contests, problem set reviews, and team sponsorships." },
                  { title: "Web & Mobile App Dev Wing", desc: "Full-stack bootcamps, project showcases, and hackathons." },
                  { title: "AI & Data Science Wing", desc: "Research paper reading groups and practical machine learning talks." },
                  { title: "Media, PR & Publications Wing", desc: "Digital content creation, photography, and 'BytePulse' tech magazine." }
                ].map((wing, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>✓</span>
                    <div>
                      <strong style={{ color: '#f8fafc', fontSize: '0.92rem' }}>{wing.title}:</strong>
                      <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{wing.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '15px' }}>
            Want to meet the current leadership team?
          </h3>
          <Link to="/committee" className="btn-primary">
            Explore Executive Committee <IconChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
