from django.contrib import admin
from .models import Customer, AutomobileVO, Saleperson, Sale
# Register your models here.

admin.site.register(Customer)
admin.site.register(AutomobileVO)
admin.site.register(Saleperson)
admin.site.register(Sale)
