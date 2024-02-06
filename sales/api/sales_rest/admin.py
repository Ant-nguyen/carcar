from django.contrib import admin
from .models import Customer, AutomobileVO, Salesperson, Sale
# Register your models here.

admin.site.register(Customer)
admin.site.register(AutomobileVO)
admin.site.register(Salesperson)
admin.site.register(Sale)
