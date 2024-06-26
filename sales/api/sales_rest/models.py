from django.db import models
from django.urls import reverse
# Create your models here.
class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=250)
    phone_number = models.CharField(max_length=12)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=150,unique=True)
    sold = models.BooleanField(default=False)

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name = "sales",
        on_delete = models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name = "sales",
        on_delete = models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name = "sales",
        on_delete = models.CASCADE
    )
    price = models.PositiveIntegerField()
