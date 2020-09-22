from django.db import models
from django.contrib.auth.models import User
from medicarapi.agendas.models import Agenda
from medicarapi.medicos.models import Medico
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class Consulta(models.Model):
    dia = models.DateField(null=False, blank=False)
    horario = models.TimeField(auto_now=False, auto_now_add=False, null=False, blank=False)
    data_agendamento = models.DateTimeField(auto_now_add=True, null=False)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    agenda = models.ForeignKey(Agenda, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('consulta')
        verbose_name_plural = _('consultas')

    def __str__(self):
        return '{} - {}'.format(str(self.dia), str(self.usuario))