from django.http import HttpResponse
from rest_framework import mixins, viewsets
from oauth2_provider.contrib.rest_framework.authentication import OAuth2Authentication
from .models import Medico
from .serializers import MedicoSerializer
# Create your views here.

def test_view(request):
    return HttpResponse('Médicos')

class MedicoView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    authentication_classes = [OAuth2Authentication]
    # queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

    def get_queryset(self):
        qs = Medico.objects.all()
        search_query = self.request.GET.get('search', None)
        espec_list_query = self.request.GET.getlist('especialidade', None)

        if search_query is not None:
            qs = qs.filter(nome__icontains=search_query)
        if len(espec_list_query) > 0:
            qs = qs.filter(especialidade__in=espec_list_query)
        return qs
