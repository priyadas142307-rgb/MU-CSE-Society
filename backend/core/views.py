from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def home_api(request):
    data = {
        "message": "Welcome to MU CSE Society API"
    }
    return Response(data)