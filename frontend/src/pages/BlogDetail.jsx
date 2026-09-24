import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchBlogs } from '../services/api'
import { IconClock, IconBook } from '../components/Icons'

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    fetchBlogs().then(list => {
      const found = list.find(b => b.id === parseInt(id)) || list[0]
      setBlog(found)
    })
  }, [id])

  if (!blog) {
    return <div className="section-padding container"><p>Loading article...</p></div>
  }

  return (
    <div className="section-padding">
      <div className="container" style={{ maxWidth: '850px' }}>
        <Link to="/blog" className="btn-outline" style={{ marginBottom: '24px' }}>
          ← Back to Blog List
        </Link>

        <article className="glass-panel" style={{ overflow: 'hidden' }}>
          <img src={blog.image_url} alt={blog.title} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />

          <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge badge-yellow">{blog.category}</span>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <IconClock className="w-4 h-4" /> {blog.read_time}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#fff', marginBottom: '20px', lineHeight: 1.25 }}>
              {blog.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px', marginBottom: '30px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0284c7, #f59e0b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700
              }}>
                {blog.author[0]}
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700 }}>{blog.author}</div>
                <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{blog.author_role || 'Contributor'} • Published {blog.published_date}</div>
              </div>
            </div>

            <div style={{ color: '#cbd5e1', lineHeight: '1.85', fontSize: '1.1rem' }}>
              <p style={{ marginBottom: '22px', fontSize: '1.18rem', color: '#f8fafc', fontWeight: 500 }}>
                {blog.excerpt}
              </p>
              <p style={{ marginBottom: '20px' }}>
                {blog.content}
              </p>
              <p style={{ marginBottom: '20px' }}>
                At MU CSE Society, we emphasize writing scalable software and understanding runtime complexity under practical conditions. Clean abstractions and thorough testing are what differentiate amateur scripts from production-ready systems.
              </p>
              <p>
                Stay tuned for our upcoming hands-on workshop series where we will code together and deploy live solutions directly to cloud infrastructure!
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
