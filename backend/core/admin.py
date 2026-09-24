from django.contrib import admin
from .models import AcademicYear, CommitteeMember, Event, Notice, Alumni, Blog, Submission

@admin.register(AcademicYear)
class AcademicYearAdmin(admin.ModelAdmin):
    list_display = ('year', 'is_active')

@admin.register(CommitteeMember)
class CommitteeMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'academic_year', 'session', 'order')
    list_filter = ('academic_year', 'role')
    search_fields = ('name', 'role', 'session')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'venue', 'is_featured', 'status')
    list_filter = ('category', 'is_featured', 'status', 'date')
    search_fields = ('title', 'description', 'venue')

@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_urgent', 'published_date')
    list_filter = ('category', 'is_urgent', 'published_date')
    search_fields = ('title', 'content')

@admin.register(Alumni)
class AlumniAdmin(admin.ModelAdmin):
    list_display = ('name', 'batch', 'current_role', 'company', 'location')
    list_filter = ('batch', 'company')
    search_fields = ('name', 'company', 'current_role')

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'published_date', 'status')
    list_filter = ('category', 'status', 'published_date')
    search_fields = ('title', 'author', 'content')

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('title', 'submission_type', 'submitter_name', 'status', 'created_at')
    list_filter = ('submission_type', 'status', 'created_at')
    search_fields = ('title', 'submitter_name', 'submitter_email')
