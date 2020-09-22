from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ConsultaView

router = DefaultRouter()
router.register(r'', ConsultaView, basename='consultas')

urlpatterns = [
    path('', include(router.urls))
]