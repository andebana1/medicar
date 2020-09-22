from django.db import models
from django.contrib.postgres.fields import ArrayField
from medicarapi.medicos.models import Medico
from django.utils.translation import ugettext_lazy as _

# Create your models here.

class Agenda(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    dia = models.DateField(null=False)
    horarios = ArrayField(
        models.TimeField(auto_now=False, auto_now_add=False),
        null=False
    )

    class Meta:
        verbose_name = _('agenda')
        verbose_name_plural = _('agendas')

    def __str__(self):
        return str(self.dia)