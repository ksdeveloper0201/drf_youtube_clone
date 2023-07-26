from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import VideoSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from .models import Video

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer