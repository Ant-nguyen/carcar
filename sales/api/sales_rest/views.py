from django.shortcuts import render
from .models import Customer,Sale,Salesperson,AutomobileVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
# Create your views here.
class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]

@require_http_methods(["GET","POST","DELETE"])
def api_list_customers(request,id=None):
    if request.method == "GET":
        if id == None:
            customers = Customer.objects.all()
            return JsonResponse({"customers":customers},encoder=CustomerEncoder)
        else:
            customers = Customer.objects.filter(id=id)
            return JsonResponse(customers,encoder=CustomerEncoder,safe=False)
    elif request.method == "POST":
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(customer,encoder=CustomerEncoder,safe=False)
    else:
        count,_ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted":count>0})

@require_http_methods(["GET","POST","DELETE"])
def api_list_salesperson(request,id=None):
    if request.method == "GET":
        if id == None:
            salespersons = Salesperson.objects.all()
            return JsonResponse({"salespeople":salespersons},encoder=SalespersonEncoder)
        else:
            salespersons = Salesperson.objects.filter(id=id)
            return JsonResponse(salespersons,encoder=SalespersonEncoder,safe=False)
    elif request.method == "POST":
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(salesperson,encoder=SalespersonEncoder,safe=False)
    else:
        count,_ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted":count>0})
