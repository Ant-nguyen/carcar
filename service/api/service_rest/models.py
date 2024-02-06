from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)

class Status(models.Model):

    # id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("id",)  # Default ordering for Status
        verbose_name_plural = "statuses"  # Fix the pluralization

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)

    status = models.ForeignKey(
        Status,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get_or_create(name="created")[0]
        appointment = cls(**kwargs)
        appointment.save()
        return appointment

    def cancel(self):
        status = Status.objects.get_or_create(name="canceled")[0]
        self.status = status
        self.save()

    def finish(self):
        status = Status.objects.get_or_create(name="finished")[0]
        self.status = status
        self.save()
