import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchHomeData, fetchEvents, fetchNotices, fetchCommittee, fetchBlogs } from '../services/api'
import {
  IconCalendar, IconMapPin, IconClock, IconBell, IconUsers,
  IconChevronRight, IconAward, IconCode, IconBook, IconShield
} from '../components/Icons'

export default function Home() {
  const [homeData, setHomeData] = useState(null)
  const [events, setEvents] = useState([])
  const [notices, setNotices] = useState([])
  const [committee, setCommittee] = useState([])
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [hData, evData, ntData, cmData, blData] = await Promise.all([
          fetchHomeData(),
          fetchEvents(),
          fetchNotices(),
          fetchCommittee(),
          fetchBlogs()
        ])
        setHomeData(hData)
        setEvents(evData.slice(0, 3))
        setNotices(ntData.slice(0, 3))
        setCommittee(cmData.slice(0, 4))
        setBlogs(blData.slice(0, 2))
      } catch (err) {
        console.error('Error loading home data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '90px 0 70px',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '30px',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              color: '#fbbf24',
              fontSize: '0.88rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '24px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', display: 'inline-block' }}></span>
              OFFICIAL STUDENT CHAPTER • METROPOLITAN UNIVERSITY
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.03em'
            }}>
              Empowering Future Tech Leaders at <span className="gradient-text-yellow">MU CSE Society</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#94a3b8',
              lineHeight: 1.7,
              marginBottom: '36px',
              maxWidth: '700px',
              margin: '0 auto 36px'
            }}>
              Connecting passionate coders, competitive programmers, researchers, and innovators. Join the premier tech community of Metropolitan University.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/events" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
                Explore Events <IconChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/notices" className="btn-secondary" style={{ padding: '14px 26px', fontSize: '1.05rem' }}>
                <IconBell className="w-5 h-5" /> Society Notices
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '60px'
          }}>
            {[
              { label: 'Active Members', value: homeData?.stats?.total_members || '650+', icon: IconUsers, color: '#38bdf8' },
              { label: 'Workshops & Fests', value: homeData?.stats?.workshops_conducted || '45+', icon: IconCode, color: '#fbbf24' },
              { label: 'Upcoming Events', value: `${events.length}+`, icon: IconCalendar, color: '#34d399' },
              { label: 'Alumni Worldwide', value: homeData?.stats?.alumni_network || '200+', icon: IconAward, color: '#a78bfa' }
            ].map((stat, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <stat.icon className="w-8 h-8" style={{ color: stat.color, margin: '0 auto 10px' }} />
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '35px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <div className="badge badge-yellow" style={{ marginBottom: '8px' }}>Flagship Activities</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>Upcoming & Featured Events</h2>
            </div>
            <Link to="/events" className="btn-outline">
              View All Events <IconChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
            {events.map((event) => (
              <div key={event.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={event.image_url}
                    alt={event.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span className="badge badge-blue">{event.category}</span>
                  </div>
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>
                    {event.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                    {event.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '15px', color: '#cbd5e1', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IconCalendar className="w-4 h-4" style={{ color: '#fbbf24' }} /> {event.date} • {event.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IconMapPin className="w-4 h-4" style={{ color: '#38bdf8' }} /> {event.venue}
                    </div>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <Link to={`/events/${event.id}`} className="btn-primary" style={{ width: '100%' }}>
                      Details & Registration
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Notices Board */}
      <section className="section-padding" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '35px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <div className="badge badge-urgent" style={{ marginBottom: '8px' }}>Official Circulars</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>Department & Society Notices</h2>
            </div>
            <Link to="/notices" className="btn-outline">
              All Notices <IconChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {notices.map((notice) => (
              <div key={notice.id} className="glass-panel" style={{ padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1, minWidth: '260px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: notice.is_urgent ? 'rgba(239, 68, 68, 0.15)' : 'rgba(2, 132, 199, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: notice.is_urgent ? '#f87171' : '#38bdf8',
                    flexShrink: 0
                  }}>
                    <IconBell className="w-5 h-5" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                      {notice.is_urgent && <span className="badge badge-urgent">URGENT</span>}
                      <span className="badge badge-blue">{notice.category}</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Published on {notice.published_date}</span>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                      {notice.title}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                      {notice.content}
                    </p>
                  </div>
                </div>
                <div>
                  <Link to={`/notices/${notice.id}`} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    Read Notice
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Committee Spotlight */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 45px' }}>
            <div className="badge badge-yellow" style={{ marginBottom: '8px' }}>Leadership 2025-2026</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>Executive Committee</h2>
            <p style={{ color: '#94a3b8', marginTop: '10px' }}>
              Guiding the society wings with technical passion, leadership, and student mentorship.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px' }}>
            {committee.map((member) => (
              <div key={member.id} className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <img
                  src={member.image_url}
                  alt={member.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 16px',
                    border: '3px solid rgba(245, 158, 11, 0.4)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)'
                  }}
                />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                  {member.name}
                </h3>
                <div style={{ color: '#fbbf24', fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px' }}>
                  {member.role}
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
                  {member.bio}
                </p>
                <Link to={`/committee/${member.id}`} className="btn-outline" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
                  View Profile
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '35px' }}>
            <Link to="/committee" className="btn-secondary">
              View Complete Committee List →
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blogs / Insights */}
      <section className="section-padding" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '35px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <div className="badge badge-blue" style={{ marginBottom: '8px' }}>Tech Publications</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>From the Society Blog</h2>
            </div>
            <Link to="/blog" className="btn-outline">
              All Articles <IconChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
            {blogs.map((blog) => (
              <div key={blog.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={blog.image_url} alt={blog.title} style={{ height: '170px', width: '100%', objectFit: 'cover' }} />
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge badge-yellow">{blog.category}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{blog.read_time}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                    {blog.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '18px', flex: 1 }}>
                    {blog.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>By {blog.author}</span>
                    <Link to={`/blog/${blog.id}`} style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600 }}>
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="section-padding">
        <div className="container">
          <div className="glass-panel" style={{
            padding: '50px 30px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(245, 158, 11, 0.15))',
            borderColor: 'rgba(245, 158, 11, 0.3)'
          }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '15px' }}>
              Have an Idea, Event, or Article to Share?
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 30px', lineHeight: 1.6 }}>
              Members and students can submit events, notices, articles, and alumni profiles for administrative review.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/submit" className="btn-primary" style={{ padding: '14px 30px', fontSize: '1rem' }}>
                Submit Content for Review
              </Link>
              <Link to="/contact" className="btn-secondary" style={{ padding: '14px 26px', fontSize: '1rem' }}>
                Contact Society Office
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
