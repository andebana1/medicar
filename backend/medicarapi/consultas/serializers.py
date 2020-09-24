from rest_framework import serializers
from .models import Consulta
from datetime import date, datetime
from medicarapi.medicos.models import Medico
from medicarapi.medicos.serializers import MedicoSerializer
from django.forms.models import model_to_dict

class ConsultaSerializer(serializers.ModelSerializer):
    horario = serializers.TimeField(format='%H:%M')
    data_agendamento = serializers.DateTimeField(format="iso-8601")
    class Meta:
        model = Consulta
        fields = '__all__'
        extra_kwargs = {
            'agenda': {'write_only': True},
            'usuario': {'write_only': True}
        }

    def validate_dia(self, value):
        if value < date.today():
            raise serializers.ValidationError('Data inválida. Consultas apenas para datas a partir de hoje.')

        return value

    def create(self, validated_data):
        qs = Consulta.objects.all()

        consulta_dia = qs.filter(
            usuario=validated_data.get('usuario').id,
            dia=validated_data.get('dia'),
            horario=validated_data.get('horario')
        )
        if len(consulta_dia) > 0:
            raise serializers.ValidationError('Já existe uma consulta para')

        consulta_preenchida = qs.filter(
            agenda=validated_data.get('agenda').id,
            dia=validated_data.get('dia'),
            horario=validated_data.get('horario')
        )

        if len(consulta_preenchida) > 0:
            raise serializers.ValidationError('Uma consulta nesse horário já foi marcada. Tente outro horário')

        return super(ConsultaSerializer, self).create(validated_data)
        # consulta = Consulta.objects.create(**validated_data)

        # return consulta

    def to_representation(self, instance):
        ret = super(ConsultaSerializer, self).to_representation(instance)

        medico = Medico.objects.get(pk=ret['medico'])
        medico = MedicoSerializer(medico).data
        ret['medico'] = medico
        return ret
