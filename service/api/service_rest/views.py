from django.http import JsonResponse, HttpResponseNotFound
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason",
    ]

    encoders = {
        "technician": TechnicianEncoder()
    }

    def get_extra_data(self, o):
        return {"status": o.status.name}

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    try:
        if request.method == "GET":
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians},
                encoder=TechnicianEncoder
            )

        else:
            content = json.loads(request.body)

            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
    except json.JSONDecodeError:
        return JsonResponse(
            {"message": "Invalid JSON in request body"},
            status=400
        )

@require_http_methods(["DELETE"])
def api_delete_technician(request, pk):
    count, _ = Technician.objects.filter(id=pk).delete()
    deleted = True if count > 0 else f"Technician {pk} not found"
    return JsonResponse({"deleted": deleted})

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=400,
            )

        appointment = Appointment.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )

def api_delete_appointment(request, pk):
    count, _ = Appointment.objects.filter(id=pk).delete()
    deleted = True if count > 0 else f"Appointment {pk} not found"
    return JsonResponse({"deleted": deleted})

@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.cancel()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse({"message": f"Appointment {pk} not found"})

@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.finish()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse({"message": f"Appointment {pk} not found"})
