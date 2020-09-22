from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.

class Especialidade(models.Model):
    especialidade = models.CharField(max_length=100, null=False)

    class Meta:
        verbose_name = _('especialidade')
        verbose_name_plural = _('especialidades')

    def __str__(self):
        return self.especialidade