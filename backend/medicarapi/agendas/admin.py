from django.contrib import admin
from .models import Agenda
# Register your models here.

class AgendaAdmin(admin.ModelAdmin):
    pass

admin.site.register(Agenda, AgendaAdmin)