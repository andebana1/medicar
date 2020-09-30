from django.urls import path, include
from .views import UserCreateView, UserGetAPIView

urlpatterns = [
    path('register/', UserCreateView.as_view()),
    path('', UserGetAPIView.as_view())
]