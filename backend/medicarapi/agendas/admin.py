from django.contrib import admin
from .models import Agenda
from .forms import AgendaForm
# Register your models here.

class AgendaAdmin(admin.ModelAdmin):
    form = AgendaForm

admin.site.register(Agenda, AgendaAdmin)