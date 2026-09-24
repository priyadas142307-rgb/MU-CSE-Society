from django.db import models
from django.contrib.auth.models import User

class AcademicYear(models.Model):
    year = models.CharField(max_length=20, unique=True, default="2025-2026")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.year

class CommitteeMember(models.Model):
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=100)  # e.g., President, General Secretary
    academic_year = models.CharField(max_length=20, default="2025-2026")
    department = models.CharField(max_length=100, default="Computer Science & Engineering")
    session = models.CharField(max_length=50, blank=True, default="2021-22")
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    image_url = models.URLField(blank=True, default="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80")
    bio = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.name} - {self.role} ({self.academic_year})"

class Event(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, blank=True)
    description = models.TextField()
    category = models.CharField(max_length=50, default="Workshop")  # Workshop, Fest, Contest, Seminar
    date = models.DateField()
    time = models.CharField(max_length=50, default="10:00 AM - 04:00 PM")
    venue = models.CharField(max_length=200, default="CSE Seminar Hall / Lab 3")
    image_url = models.URLField(blank=True, default="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80")
    registration_link = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved')], default='approved')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title

class Notice(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField()
    category = models.CharField(max_length=50, default="Society Update")  # Academic, Society Update, Urgent, Contest
    is_urgent = models.BooleanField(default=False)
    attachment_url = models.URLField(blank=True)
    published_date = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-published_date', '-id']

    def __str__(self):
        return self.title

class Alumni(models.Model):
    name = models.CharField(max_length=150)
    batch = models.CharField(max_length=50)  # e.g., 14th Batch / 2022
    current_role = models.CharField(max_length=150)  # e.g., Software Engineer
    company = models.CharField(max_length=150)  # e.g., Google, Brain Station 23
    location = models.CharField(max_length=100, default="Dhaka, Bangladesh")
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    image_url = models.URLField(blank=True, default="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80")
    quote = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='approved')

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f"{self.name} - {self.company}"

class Blog(models.Model):
    title = models.CharField(max_length=250)
    excerpt = models.CharField(max_length=300)
    content = models.TextField()
    author = models.CharField(max_length=100, default="CSE Society Editorial")
    author_role = models.CharField(max_length=100, default="Member")
    category = models.CharField(max_length=50, default="Technology")
    image_url = models.URLField(blank=True, default="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80")
    published_date = models.DateField(auto_now_add=True)
    read_time = models.CharField(max_length=20, default="5 min read")
    status = models.CharField(max_length=20, default='approved')

    class Meta:
        ordering = ['-published_date', '-id']

    def __str__(self):
        return self.title

class Submission(models.Model):
    SUBMISSION_TYPES = [
        ('event', 'Event'),
        ('notice', 'Notice'),
        ('blog', 'Blog'),
        ('alumni', 'Alumni'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    submission_type = models.CharField(max_length=20, choices=SUBMISSION_TYPES)
    title = models.CharField(max_length=250)
    details = models.TextField()
    submitter_name = models.CharField(max_length=150)
    submitter_email = models.EmailField()
    submitter_student_id = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.submission_type.upper()}] {self.title} by {self.submitter_name}"
