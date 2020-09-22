from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AgendaView

router = DefaultRouter()
router.register(r'', AgendaView, basename='agendas')

urlpatterns = [
    path('', include(router.urls))
]