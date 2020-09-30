from django import forms
from .models import Agenda
from datetime import date

class AgendaForm(forms.ModelForm):
    class Meta:
        model = Agenda
        fields = '__all__'

    def clean_dia(self):
        dia = self.cleaned_data.get('dia')
        if dia < date.today():
            raise forms.ValidationError('O dia deve ser maior ou igual ao de hoje')

        return dia

    def clean_medico(self):
        medico = self.cleaned_data.get('medico')
        agendas = Agenda.objects.filter(medico=medico, dia=date.today())
        if len(agendas) > 0:
            raise forms.ValidationError('O médico informado já possui uma agenda para hoje.')

        return medico