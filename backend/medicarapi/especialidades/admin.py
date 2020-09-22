from django.contrib import admin
from .models import Especialidade

# Register your models here.


class EspecialidadeAdmin(admin.ModelAdmin):
    pass


admin.site.register(Especialidade, EspecialidadeAdmin)