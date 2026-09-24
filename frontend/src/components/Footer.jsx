import React from 'react'
import { Link } from 'react-router-dom'
import { IconGithub, IconLinkedin, IconMail, IconMapPin } from './Icons'

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(2, 6, 23, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '60px 0 30px',
      marginTop: '60px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Col 1: About Society */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0284c7, #f59e0b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.1rem'
              }}>
                MU
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
                MU CSE <span style={{ color: '#fbbf24' }}>SOCIETY</span>
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
              The official hub for Computer Science & Engineering students at Metropolitan University. Fostering competitive programming, software development, academic leadership, and alumni networking.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s'
              }}>
                <IconGithub className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s'
              }}>
                <IconLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'About Department & Society', path: '/about' },
                { name: 'Upcoming Events & Fests', path: '/events' },
                { name: 'Official Notices & Circulars', path: '/notices' },
                { name: 'Executive Committee', path: '/committee' },
                { name: 'Alumni Network & Stories', path: '/alumni' },
                { name: 'Tech Blogs & Insights', path: '/blog' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} style={{ color: '#94a3b8', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#38bdf8'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                  >
                    → {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Wings & Activities */}
          <div>
            <h4 style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Society Wings
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f8fafc' }}>Competitive Programming Wing</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Weekly bootcamps, intra-university mock contests & ICPC coaching</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f8fafc' }}>Software & Web Development Wing</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Project mentoring, open-source workshops, and full-stack bootcamps</div>
              </div>
            </div>
          </div>

          {/* Col 4: Campus Location */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Contact Office
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#94a3b8', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <IconMapPin className="w-5 h-5" style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>Department of CSE, Metropolitan University, Bateshwar, Sylhet, Bangladesh</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <IconMail className="w-5 h-5" style={{ color: '#38bdf8', flexShrink: 0 }} />
                <span>cse.society@metrouni.edu.bd</span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <Link to="/contact" className="btn-outline" style={{ display: 'inline-flex', padding: '8px 16px' }}>
                  Send a Message →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '25px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '15px',
          color: '#64748b',
          fontSize: '0.85rem'
        }}>
          <div>
            © {new Date().getFullYear()} MU CSE Society. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/submit" style={{ color: '#fbbf24' }}>Submit Content</Link>
            <Link to="/admin" style={{ color: '#94a3b8' }}>Admin Panel</Link>
            <Link to="/about" style={{ color: '#94a3b8' }}>Privacy & Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
