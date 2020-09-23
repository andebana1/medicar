from rest_framework import serializers
from medicarapi.especialidades.serializers import EspecialidadeSerializer
from .models import Medico

class MedicoSerializer(serializers.ModelSerializer):
    especialidade = EspecialidadeSerializer(read_only=True)

    class Meta:
        model = Medico
        fields = '__all__'
        extra_kwargs = {
            'email': {'write_only': True},
            'telefone': {'write_only': True}
        }