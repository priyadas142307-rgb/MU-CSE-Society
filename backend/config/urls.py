from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse, HttpResponse

def root_api(request):
    if 'text/html' in request.META.get('HTTP_ACCEPT', ''):
        html_content = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MU CSE Society - Backend Server</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background-color: #090d16;
              color: #f8fafc;
              margin: 0;
              padding: 40px 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 85vh;
            }
            .card {
              background: rgba(15, 23, 42, 0.9);
              border: 1px solid rgba(245, 158, 11, 0.3);
              border-radius: 20px;
              padding: 40px;
              max-width: 650px;
              text-align: center;
              box-shadow: 0 20px 40px rgba(0,0,0,0.6);
            }
            h1 {
              font-size: 2.2rem;
              margin-bottom: 12px;
              color: #ffffff;
            }
            .badge {
              display: inline-block;
              background: rgba(52, 211, 153, 0.15);
              color: #34d399;
              border: 1px solid #34d399;
              padding: 6px 14px;
              border-radius: 20px;
              font-size: 0.85rem;
              font-weight: 700;
              margin-bottom: 20px;
            }
            p {
              color: #94a3b8;
              font-size: 1.05rem;
              line-height: 1.7;
              margin-bottom: 30px;
            }
            .buttons {
              display: flex;
              gap: 15px;
              justify-content: center;
              flex-wrap: wrap;
            }
            .btn {
              padding: 12px 24px;
              border-radius: 12px;
              font-weight: 700;
              text-decoration: none;
              font-size: 0.95rem;
              display: inline-block;
              transition: transform 0.2s;
            }
            .btn-primary {
              background: linear-gradient(135deg, #f59e0b, #d97706);
              color: #0f172a;
            }
            .btn-secondary {
              background: rgba(2, 132, 199, 0.2);
              color: #38bdf8;
              border: 1px solid #0284c7;
            }
            .admin-box {
              background: rgba(255, 255, 255, 0.04);
              border-radius: 12px;
              padding: 16px;
              margin-top: 30px;
              text-align: left;
              font-size: 0.88rem;
              border: 1px solid rgba(255, 255, 255, 0.08);
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">● BACKEND API OPERATIONAL</div>
            <h1>MU CSE Society API</h1>
            <p>This is the official Django REST API Server powering the MU CSE Society student platform.</p>
            <div class="buttons">
              <a href="https://mu-cse-society-git-main-priyadas142307-rgb.vercel.app" class="btn btn-primary">
                🌐 Visit Full Frontend Website (Vercel)
              </a>
              <a href="/admin/" class="btn btn-secondary">
                🛡️ Open Admin Panel (/admin/)
              </a>
            </div>
            <div class="admin-box">
              <strong style="color: #fbbf24;">🔑 Auto-Generated Superuser Login:</strong><br />
              <span style="color: #cbd5e1;">Username: <code>admin</code></span><br />
              <span style="color: #cbd5e1;">Password: <code>admin12345</code></span>
            </div>
          </div>
        </body>
        </html>
        """
        return HttpResponse(html_content)

    return JsonResponse({
        "status": "online",
        "message": "MU CSE Society Backend API is running successfully!",
        "endpoints": {
            "admin": "/admin/",
            "home": "/api/home/",
            "events": "/api/events/",
            "notices": "/api/notices/",
            "committee": "/api/committee/",
            "alumni": "/api/alumni/",
            "blogs": "/api/blogs/",
            "submissions": "/api/submissions/"
        }
    })

urlpatterns = [
    path('', root_api),
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]