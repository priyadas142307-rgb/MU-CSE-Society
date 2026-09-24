from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Count
from .models import AcademicYear, CommitteeMember, Event, Notice, Alumni, Blog, Submission
from .serializers import (
    AcademicYearSerializer, CommitteeMemberSerializer, EventSerializer,
    NoticeSerializer, AlumniSerializer, BlogSerializer, SubmissionSerializer
)

# Seed / Mock data for instant display if database has not been populated yet
DEFAULT_EVENTS = [
    {
        "id": 1,
        "title": "MU National Programming Contest 2026",
        "description": "The biggest inter-university competitive programming contest of the season organized by MU CSE Society with teams participating from across the nation.",
        "category": "Contest",
        "date": "2026-10-15",
        "time": "09:00 AM - 06:00 PM",
        "venue": "MU Central Auditorium & CSE Computer Labs",
        "image_url": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        "registration_link": "https://forms.google.com",
        "is_featured": True,
        "status": "approved"
    },
    {
        "id": 2,
        "title": "Full-Stack Web Development Bootcamp",
        "description": "An intensive 3-day hands-on workshop covering modern web stacks including React, Django REST Framework, Docker, and Cloud Deployment.",
        "category": "Workshop",
        "date": "2026-10-22",
        "time": "02:00 PM - 05:00 PM",
        "venue": "CSE Software Lab 2",
        "image_url": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
        "registration_link": "https://forms.google.com",
        "is_featured": True,
        "status": "approved"
    },
    {
        "id": 3,
        "title": "AI & Machine Learning Tech Talk with Industry Experts",
        "description": "Session on generative AI pipelines, practical deep learning implementations, and career roadmaps in modern artificial intelligence with alumni working at tech giants.",
        "category": "Seminar",
        "date": "2026-11-05",
        "time": "11:00 AM - 01:30 PM",
        "venue": "MU Gallery 1",
        "image_url": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
        "registration_link": "https://forms.google.com",
        "is_featured": False,
        "status": "approved"
    }
]

DEFAULT_NOTICES = [
    {
        "id": 1,
        "title": "Registration Open: Executive Committee Recruitment 2026",
        "content": "MU CSE Society is inviting enthusiastic, dedicated students from 2nd and 3rd year to join our dynamic executive committee wings (Competitive Programming, Web & App, Media, Public Relations).",
        "category": "Recruitment",
        "is_urgent": True,
        "published_date": "2026-09-20",
        "attachment_url": "#"
    },
    {
        "id": 2,
        "title": "Selection Test for ICPC Dhaka Regional Preliminary 2026",
        "content": "Intra-university mock team contest will be held this Friday in Lab 1 & 2. Top scoring teams will receive society registration sponsorship.",
        "category": "Contest",
        "is_urgent": True,
        "published_date": "2026-09-18",
        "attachment_url": "#"
    },
    {
        "id": 3,
        "title": "Call for Articles: CSE Tech Magazine 'BytePulse' Vol. IV",
        "content": "Submit your tech articles, research summaries, open source project showcases, and student tech journeys for our annual society magazine.",
        "category": "Publication",
        "is_urgent": False,
        "published_date": "2026-09-10",
        "attachment_url": "#"
    }
]

DEFAULT_COMMITTEE = [
    {
        "id": 1,
        "name": "Prof. Dr. Tariqul Islam",
        "role": "Chief Advisor",
        "academic_year": "2025-2026",
        "department": "Computer Science & Engineering",
        "session": "Faculty",
        "email": "tariqul@mu.edu.bd",
        "linkedin": "https://linkedin.com",
        "github": "",
        "image_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
        "bio": "Professor & Head of Department of CSE, guiding MU CSE Society towards innovation and research excellence.",
        "order": 1
    },
    {
        "id": 2,
        "name": "Priya Das",
        "role": "President",
        "academic_year": "2025-2026",
        "department": "Computer Science & Engineering",
        "session": "2021-2022",
        "email": "priya.cse@mu.edu.bd",
        "linkedin": "https://linkedin.com",
        "github": "https://github.com",
        "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
        "bio": "Passionate about building inclusive tech communities, open source collaboration, and leadership.",
        "order": 2
    },
    {
        "id": 3,
        "name": "Anik Dey",
        "role": "General Secretary",
        "academic_year": "2025-2026",
        "department": "Computer Science & Engineering",
        "session": "2021-2022",
        "email": "anik.cse@mu.edu.bd",
        "linkedin": "https://linkedin.com",
        "github": "https://github.com",
        "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
        "bio": "Competitive programmer and full-stack engineer coordinating society operations, workshops, and contests.",
        "order": 3
    },
    {
        "id": 4,
        "name": "Tanvir Ahmed",
        "role": "Vice President (Events)",
        "academic_year": "2025-2026",
        "department": "Computer Science & Engineering",
        "session": "2021-2022",
        "email": "tanvir@mu.edu.bd",
        "linkedin": "https://linkedin.com",
        "github": "https://github.com",
        "image_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
        "bio": "Leads event execution, hackathons, guest seminars, and student orientation programs.",
        "order": 4
    }
]

DEFAULT_ALUMNI = [
    {
        "id": 1,
        "name": "Shahriar Hossain",
        "batch": "12th Batch (2020)",
        "current_role": "Software Engineer II",
        "company": "Amazon Web Services",
        "location": "Vancouver, Canada",
        "linkedin": "https://linkedin.com",
        "github": "https://github.com",
        "image_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
        "quote": "MU CSE Society gave me my first experience of team engineering and contest problem-solving, which was pivotal for my career."
    },
    {
        "id": 2,
        "name": "Farhana Yasmin",
        "batch": "13th Batch (2021)",
        "current_role": "Senior Frontend Engineer",
        "company": "Brain Station 23",
        "location": "Dhaka, Bangladesh",
        "linkedin": "https://linkedin.com",
        "github": "https://github.com",
        "image_url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
        "quote": "The workshops and peer mentoring inside the society helped me bridge the gap between academic theory and real-world tech."
    },
    {
        "id": 3,
        "name": "Nafis Fuad",
        "batch": "14th Batch (2022)",
        "current_role": "DevOps & Cloud Specialist",
        "company": "Optimizely",
        "location": "Dhaka, Bangladesh",
        "linkedin": "https://linkedin.com",
        "github": "https://github.com",
        "image_url": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
        "quote": "Never stop building. Join the society contests and push your code to GitHub every single day."
    }
]

DEFAULT_BLOGS = [
    {
        "id": 1,
        "title": "Mastering Dynamic Programming for ICPC & Tech Interviews",
        "excerpt": "A step-by-step roadmap to identify optimal substructure and overlapping subproblems with practical visualization techniques.",
        "content": "Dynamic Programming (DP) is one of the most frequently asked algorithmic paradigms in competitive programming and top-tier software engineering interviews. In this article, we break down top-down memoization vs bottom-up tabulation...",
        "author": "Anik Dey",
        "author_role": "General Secretary & CP Lead",
        "category": "Algorithms",
        "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        "published_date": "2026-09-15",
        "read_time": "6 min read"
    },
    {
        "id": 2,
        "title": "Building Production REST APIs with Django & Vite React",
        "excerpt": "Learn how modern monolithic and decoupled full-stack architectures integrate secure session tokens, CORS, and WhiteNoise.",
        "content": "Decoupled web applications give frontend teams maximum autonomy with modern build tools like Vite while empowering backend developers with Django's bulletproof ORM...",
        "author": "Priya Das",
        "author_role": "President",
        "category": "Web Dev",
        "image_url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        "published_date": "2026-09-12",
        "read_time": "4 min read"
    }
]

@api_view(['GET'])
def home_api(request):
    """Home summary API with statistics and highlights"""
    events_count = Event.objects.filter(status='approved').count() or len(DEFAULT_EVENTS)
    notices_count = Notice.objects.count() or len(DEFAULT_NOTICES)
    committee_count = CommitteeMember.objects.count() or len(DEFAULT_COMMITTEE)
    alumni_count = Alumni.objects.count() or len(DEFAULT_ALUMNI)

    return Response({
        "message": "Welcome to MU CSE Society API",
        "society_name": "MU CSE Society",
        "tagline": "Empowering Innovation, Coding & Leadership in CSE",
        "university": "Metropolitan University",
        "stats": {
            "total_members": "650+",
            "active_events": events_count,
            "notices": notices_count,
            "alumni_network": "200+",
            "workshops_conducted": "45+"
        }
    })

@api_view(['GET', 'POST'])
def events_api(request):
    if request.method == 'GET':
        events = Event.objects.filter(status='approved')
        if events.exists():
            return Response(EventSerializer(events, many=True).data)
        return Response(DEFAULT_EVENTS)
    elif request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(status='pending')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def event_detail_api(request, pk):
    try:
        event = Event.objects.get(pk=pk)
        return Response(EventSerializer(event).data)
    except Event.DoesNotExist:
        # Fallback to default list matching pk
        for ev in DEFAULT_EVENTS:
            if ev["id"] == int(pk):
                return Response(ev)
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST'])
def notices_api(request):
    if request.method == 'GET':
        notices = Notice.objects.all()
        if notices.exists():
            return Response(NoticeSerializer(notices, many=True).data)
        return Response(DEFAULT_NOTICES)
    elif request.method == 'POST':
        serializer = NoticeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def notice_detail_api(request, pk):
    try:
        notice = Notice.objects.get(pk=pk)
        return Response(NoticeSerializer(notice).data)
    except Notice.DoesNotExist:
        for nt in DEFAULT_NOTICES:
            if nt["id"] == int(pk):
                return Response(nt)
        return Response({"error": "Notice not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def committee_api(request):
    year = request.GET.get('year', '2025-2026')
    members = CommitteeMember.objects.filter(academic_year=year)
    if members.exists():
        return Response(CommitteeMemberSerializer(members, many=True).data)
    return Response(DEFAULT_COMMITTEE)

@api_view(['GET'])
def committee_member_api(request, pk):
    try:
        member = CommitteeMember.objects.get(pk=pk)
        return Response(CommitteeMemberSerializer(member).data)
    except CommitteeMember.DoesNotExist:
        for m in DEFAULT_COMMITTEE:
            if m["id"] == int(pk):
                return Response(m)
        return Response({"error": "Member not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST'])
def alumni_api(request):
    if request.method == 'GET':
        alumni = Alumni.objects.filter(status='approved')
        if alumni.exists():
            return Response(AlumniSerializer(alumni, many=True).data)
        return Response(DEFAULT_ALUMNI)
    elif request.method == 'POST':
        serializer = AlumniSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(status='pending')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def alumni_detail_api(request, pk):
    try:
        alumnus = Alumni.objects.get(pk=pk)
        return Response(AlumniSerializer(alumnus).data)
    except Alumni.DoesNotExist:
        for a in DEFAULT_ALUMNI:
            if a["id"] == int(pk):
                return Response(a)
        return Response({"error": "Alumni not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST'])
def blogs_api(request):
    if request.method == 'GET':
        blogs = Blog.objects.filter(status='approved')
        if blogs.exists():
            return Response(BlogSerializer(blogs, many=True).data)
        return Response(DEFAULT_BLOGS)
    elif request.method == 'POST':
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(status='pending')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def blog_detail_api(request, pk):
    try:
        blog = Blog.objects.get(pk=pk)
        return Response(BlogSerializer(blog).data)
    except Blog.DoesNotExist:
        for b in DEFAULT_BLOGS:
            if b["id"] == int(pk):
                return Response(b)
        return Response({"error": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST'])
def submissions_api(request):
    if request.method == 'GET':
        submissions = Submission.objects.all()
        return Response(SubmissionSerializer(submissions, many=True).data)
    elif request.method == 'POST':
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(status='pending')
            return Response({
                "message": "Submission received successfully! Pending admin approval.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH', 'DELETE'])
def submission_action_api(request, pk):
    try:
        submission = Submission.objects.get(pk=pk)
    except Submission.DoesNotExist:
        return Response({"error": "Submission not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        status_update = request.data.get('status')
        if status_update in ['approved', 'rejected']:
            submission.status = status_update
            submission.save()
            return Response({"message": f"Submission marked as {status_update}", "status": status_update})
        return Response({"error": "Invalid status value"}, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        submission.delete()
        return Response({"message": "Submission deleted"})