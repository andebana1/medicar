from django.db import models
from medicarapi.especialidades.models import Especialidade
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class Medico(models.Model):
    nome = models.CharField(max_length=150, null=False)
    crm = models.CharField(max_length=4, null=False)
    email = models.EmailField(max_length=250, null=True, blank=True)
    telefone = models.CharField(max_length=11, null=True, blank=True)
    especialidade = models.ForeignKey(Especialidade, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = _('medico')
        verbose_name_plural = _('medicos')

    def __str__(self):
        return '{} - {}'.format(self.nome, self.crm)
