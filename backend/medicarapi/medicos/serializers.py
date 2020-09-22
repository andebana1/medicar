from rest_framework import serializers
from medicarapi.especialidades.serializers import EspecialidadeSerializer
from .models import Medico

class MedicoSerializer(serializers.ModelSerializer):
    especialidade = EspecialidadeSerializer(read_only=True)

    class Meta:
        model = Medico
        fields = '__all__'