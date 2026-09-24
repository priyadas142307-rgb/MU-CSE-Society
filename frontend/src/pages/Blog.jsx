import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchBlogs } from '../services/api'
import { IconBook, IconClock, IconSearch, IconChevronRight } from '../components/Icons'

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchBlogs().then(setBlogs)
  }, [])

  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <div className="badge badge-yellow" style={{ marginBottom: '10px' }}>Tech Publication & Insights</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            MU CSE Society Blog
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' }}>
            Deep-dives into competitive programming strategies, modern web architecture, AI innovations, and student tech journeys.
          </p>
        </div>

        {/* Search */}
        <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
          <input
            type="text"
            placeholder="Search articles by title or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
          />
        </div>

        {/* Blog Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
          {filtered.map(blog => (
            <div key={blog.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img src={blog.image_url} alt={blog.title} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
              <div style={{ padding: '26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-yellow">{blog.category}</span>
                  <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IconClock className="w-3.5 h-3.5" /> {blog.read_time}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                  {blog.title}
                </h3>

                <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                  {blog.excerpt}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '15px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>By {blog.author}</span>
                  <Link to={`/blog/${blog.id}`} className="btn-primary" style={{ padding: '6px 16px', fontSize: '0.82rem' }}>
                    Read Full Article
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
