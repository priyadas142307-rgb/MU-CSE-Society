from django.urls import path
from .views import (
    home_api, events_api, event_detail_api, notices_api, notice_detail_api,
    committee_api, committee_member_api, alumni_api, alumni_detail_api,
    blogs_api, blog_detail_api, submissions_api, submission_action_api
)

urlpatterns = [
    path('home/', home_api),
    path('events/', events_api),
    path('events/<int:pk>/', event_detail_api),
    path('notices/', notices_api),
    path('notices/<int:pk>/', notice_detail_api),
    path('committee/', committee_api),
    path('committee/<int:pk>/', committee_member_api),
    path('alumni/', alumni_api),
    path('alumni/<int:pk>/', alumni_detail_api),
    path('blogs/', blogs_api),
    path('blogs/<int:pk>/', blog_detail_api),
    path('submissions/', submissions_api),
    path('submissions/<int:pk>/', submission_action_api),
]