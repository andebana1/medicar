from django.contrib import admin
from .models import Consulta
# Register your models here.

class ConsultaAdmin(admin.ModelAdmin):
    pass

admin.site.register(Consulta, ConsultaAdmin)