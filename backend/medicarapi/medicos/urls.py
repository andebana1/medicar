from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', MedicoView, basename='medicos')


urlpatterns = [
    path('', include(router.urls))
]