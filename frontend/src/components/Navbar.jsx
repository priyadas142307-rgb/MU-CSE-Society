import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconMenu, IconX, IconShield, IconUpload, IconCode } from './Icons'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Notices', path: '/notices' },
    { name: 'Committee', path: '/committee' },
    { name: 'Alumni', path: '/alumni' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      background: 'rgba(9, 13, 22, 0.85)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0284c7, #f59e0b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.2rem',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
          }}>
            MU
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#fff' }}>
              CSE <span style={{ color: '#fbbf24' }}>SOCIETY</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Metropolitan University
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '6px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '8px 14px',
                fontSize: '0.92rem',
                fontWeight: 500,
                borderRadius: '8px',
                color: isActive(link.path) ? '#fbbf24' : '#cbd5e1',
                background: isActive(link.path) ? 'rgba(245, 158, 11, 0.12)' : 'transparent',
                border: isActive(link.path) ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div style={{ display: 'none', alignItems: 'center', gap: '12px' }} className="desktop-actions">
          <Link to="/submit" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
            <IconUpload className="w-4 h-4" />
            Submit
          </Link>
          <Link to="/admin" className="btn-outline" style={{ padding: '8px 14px', fontSize: '0.88rem' }}>
            <IconShield className="w-4 h-4" />
            Admin
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          className="mobile-toggle"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(15, 23, 42, 0.98)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                color: isActive(link.path) ? '#fbbf24' : '#e2e8f0',
                background: isActive(link.path) ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Link
              to="/submit"
              onClick={() => setMobileOpen(false)}
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              <IconUpload className="w-4 h-4" /> Submit
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="btn-outline"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <IconShield className="w-4 h-4" /> Admin
            </Link>
          </div>
        </div>
      )}

      {/* Responsive CSS for Navbar */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  )
}
