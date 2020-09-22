from rest_framework import serializers
from .models import Consulta
from datetime import date, datetime
from medicarapi.medicos.serializers import MedicoSerializer

class ConsultaSerializer(serializers.ModelSerializer):
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

    # def validate_horario(self, value):
    #     # print(value)
    #     now = datetime.now()
    #     current_time = datetime.strptime(now.strftime('%H:%M'), '%H:%M').time()
    #     print(type(value))
    #     print(type(current_time))
    #     if value < current_time:
    #         raise serializers.ValidationError('Horário inválido. Consultas apenas para horários a partir do atual.')
    #
    #     return value


    def create(self, validated_data):
        print(validated_data)
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
