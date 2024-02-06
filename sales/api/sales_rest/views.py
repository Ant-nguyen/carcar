from django.shortcuts import get_object_or_404
from .models import Customer,Sale,Salesperson,AutomobileVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
# Create your views here.
class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id"
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]

class AutomobileVOEncoder (ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "sold"
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder()
    }

@require_http_methods(["GET","POST","DELETE"])
def api_list_customers(request,id=None):
    if request.method == "GET":
        if id == None:
            customers = Customer.objects.all()
            return JsonResponse({"customers":customers},encoder=CustomerEncoder)
        else:
            customers = get_object_or_404(Customer,id=id)
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
            salespersons = get_object_or_404(Salesperson,id=id)
            return JsonResponse(salespersons,encoder=SalespersonEncoder,safe=False)
    elif request.method == "POST":
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(salesperson,encoder=SalespersonEncoder,safe=False)
    else:
        count,_ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted":count>0})

@require_http_methods(["GET","POST","DELETE"])
def api_list_sale(request,id=None):
    if request.method == "GET":
        if id == None:
            sales = Sale.objects.all()
            return JsonResponse({"sales":sales},encoder=SaleEncoder)
        else:
            sales = get_object_or_404(Sale,id=id)
            return JsonResponse(sales,encoder=SaleEncoder,safe=False)
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            customer = Customer.objects.get(id=content["customer"])
            content["automobile"] = automobile
            content["salesperson"] = salesperson
            content["customer"] = customer
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"},
                status=400,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson id"},
                status=400,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=400,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(sale,encoder=SaleEncoder,safe=False)
    else:
        count,_ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted:":count>0})
