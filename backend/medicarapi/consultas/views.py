from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from oauth2_provider.contrib.rest_framework.authentication import OAuth2Authentication
from .serializers import ConsultaSerializer
from .models import Consulta
from medicarapi.agendas.models import Agenda
from datetime import datetime, date
from django.http import Http404

class ConsultaView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    authentication_classes = [OAuth2Authentication]
    serializer_class = ConsultaSerializer

    def get_queryset(self):
        return Consulta.objects.filter(usuario=self.request.user)

    def create(self, request, *args, **kwargs):
        try:
            agenda = Agenda.objects.get(id=self.request.data['agenda_id'])
            self.request.data['dia'] = agenda.dia
            self.request.data['medico'] = agenda.medico.id
            self.request.data['agenda'] = agenda.id
            self.request.data['usuario'] = self.request.user.id
            convet_time = datetime.strptime(self.request.data['horario'], '%H:%M').time()
            if convet_time not in agenda.horarios:
                return Response(
                    {
                        'horario': ['Esse horário não está disponível nessa agenda']
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            now = datetime.now()
            current_time = datetime.strptime(now.strftime('%H:%M'), '%H:%M').time()

            if agenda.dia == date.today() and convet_time < current_time:
                return Response(
                    {
                        'horario': ['Não é possível agendar uma consulta para um horário que já passou.']
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            return super(ConsultaView, self).create(request, *args, **kwargs)
        except Agenda.DoesNotExist:
            return Response(
                {
                    'message': 'Não foi encontrada nenhuma agenda com esse ID'
                },
                status=status.HTTP_404_NOT_FOUND
            )

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            if instance.dia < date.today():
                return Response(
                    {
                        'dia': ['Não é possível cancelar uma consulta que já ocorreu']
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            elif instance.horario < datetime.now().time():
                return Response(
                    {
                        'horario': ['Não é possível cancelar uma consulta que já ocorreu']
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                self.perform_destroy(instance)
        except Http404:
            return Response(
                {'Not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(status=status.HTTP_204_NO_CONTENT)
