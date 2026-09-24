from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AcademicYear',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.CharField(default='2025-2026', max_length=20, unique=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Alumni',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('batch', models.CharField(max_length=50)),
                ('current_role', models.CharField(max_length=150)),
                ('company', models.CharField(max_length=150)),
                ('location', models.CharField(default='Dhaka, Bangladesh', max_length=100)),
                ('linkedin', models.URLField(blank=True)),
                ('github', models.URLField(blank=True)),
                ('image_url', models.URLField(blank=True, default='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80')),
                ('quote', models.TextField(blank=True)),
                ('status', models.CharField(default='approved', max_length=20)),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('excerpt', models.CharField(max_length=300)),
                ('content', models.TextField()),
                ('author', models.CharField(default='CSE Society Editorial', max_length=100)),
                ('author_role', models.CharField(default='Member', max_length=100)),
                ('category', models.CharField(default='Technology', max_length=50)),
                ('image_url', models.URLField(blank=True, default='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80')),
                ('published_date', models.DateField(auto_now_add=True)),
                ('read_time', models.CharField(default='5 min read', max_length=20)),
                ('status', models.CharField(default='approved', max_length=20)),
            ],
            options={
                'ordering': ['-published_date', '-id'],
            },
        ),
        migrations.CreateModel(
            name='CommitteeMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('role', models.CharField(max_length=100)),
                ('academic_year', models.CharField(default='2025-2026', max_length=20)),
                ('department', models.CharField(default='Computer Science & Engineering', max_length=100)),
                ('session', models.CharField(blank=True, default='2021-22', max_length=50)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('phone', models.CharField(blank=True, max_length=30)),
                ('linkedin', models.URLField(blank=True)),
                ('github', models.URLField(blank=True)),
                ('image_url', models.URLField(blank=True, default='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80')),
                ('bio', models.TextField(blank=True)),
                ('order', models.IntegerField(default=0)),
            ],
            options={
                'ordering': ['order', 'id'],
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, max_length=220)),
                ('description', models.TextField()),
                ('category', models.CharField(default='Workshop', max_length=50)),
                ('date', models.DateField()),
                ('time', models.CharField(default='10:00 AM - 04:00 PM', max_length=50)),
                ('venue', models.CharField(default='CSE Seminar Hall / Lab 3', max_length=200)),
                ('image_url', models.URLField(blank=True, default='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80')),
                ('registration_link', models.URLField(blank=True)),
                ('is_featured', models.BooleanField(default=False)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved')], default='approved', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='Notice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('content', models.TextField()),
                ('category', models.CharField(default='Society Update', max_length=50)),
                ('is_urgent', models.BooleanField(default=False)),
                ('attachment_url', models.URLField(blank=True)),
                ('published_date', models.DateField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-published_date', '-id'],
            },
        ),
        migrations.CreateModel(
            name='Submission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submission_type', models.CharField(choices=[('event', 'Event'), ('notice', 'Notice'), ('blog', 'Blog'), ('alumni', 'Alumni')], max_length=20)),
                ('title', models.CharField(max_length=250)),
                ('details', models.TextField()),
                ('submitter_name', models.CharField(max_length=150)),
                ('submitter_email', models.EmailField(max_length=254)),
                ('submitter_student_id', models.CharField(blank=True, max_length=50)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
