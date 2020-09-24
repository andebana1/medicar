from rest_framework import serializers
from .models import Agenda
from medicarapi.consultas.models import Consulta
from medicarapi.medicos.serializers import MedicoSerializer
from collections import OrderedDict

class AgendaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer(read_only=True)
    horarios = serializers.ListSerializer(child=serializers.TimeField(format='%H:%M'))
    class Meta:
        model = Agenda
        fields = '__all__'

    # def to_representation(self, instance):
    #     print(instance.id)
    #     ret = super(AgendaSerializer, self).to_representation(instance)
    #     consultas = Consulta.objects.filter(agenda=instance.id)
    #
    #     pass