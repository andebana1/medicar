from rest_framework import serializers
from .models import Agenda
from medicarapi.medicos.serializers import MedicoSerializer

class AgendaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer(read_only=True)
    class Meta:
        model = Agenda
        fields = '__all__'

    def to_representation(self, instance):
        print(instance.__dict__)
        horarios = instance.horarios
        return super().to_representation(instance)
