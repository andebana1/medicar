from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import mixins, viewsets
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from .models import Especialidade
from .serializers import EspecialidadeSerializer
# Create your views here.

def test_view(request):
    return HttpResponse('Especialidades')

class EspecialidadeView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    authentication_classes = [OAuth2Authentication]
    # queryset = Especialidade.objects.all()
    serializer_class = EspecialidadeSerializer

    def get_queryset(self):
        qs = Especialidade.objects.all()
        query = self.request.GET.get('search')

        if query is not None:
            qs = qs.filter(especialidade__icontains=query)
        return qs
