from rest_framework import serializers
from .models import Especialidade


class EspecialidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidade
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }