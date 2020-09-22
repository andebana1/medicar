from django.shortcuts import render
from rest_framework import mixins, viewsets
from oauth2_provider.contrib.rest_framework.authentication import OAuth2Authentication
from .serializers import AgendaSerializer
from .models import Agenda
from datetime import date

# Create your views here.

class AgendaView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    authentication_classes = [OAuth2Authentication]
    #queryset = Agenda.objects.all()
    serializer_class = AgendaSerializer

    def get_queryset(self):
        qs = Agenda.objects.filter(dia__gte=date.today())
        query_medico = self.request.GET.getlist('medico', None)
        query_especialidade = self.request.GET.getlist('especialidade', None)
        data_ini_query = self.request.GET.get('data_inicio', None)
        data_fim_query = self.request.GET.get('data_final', None)

        qs = qs if len(query_medico) == 0 else qs.filter(medico__in=query_medico)
        qs = qs if len(query_especialidade) == 0 else qs.filter(medico__especialidade__in=query_especialidade)
        qs = qs if data_ini_query is None else qs.filter(dia__gte=data_ini_query)
        qs = qs if data_fim_query is None else qs.filter(dia__lte=data_fim_query)

        return qs.order_by('dia')
