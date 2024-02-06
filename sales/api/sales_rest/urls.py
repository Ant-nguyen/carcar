from django.urls import path, include
from .views import api_list_customers,api_list_salesperson


urlpatterns = [
    path('customers/',api_list_customers,name="api_create_customer"),
    path('customers/<int:id>/',api_list_customers,name="api_customer_detail"),
    path('salespeople/',api_list_salesperson,name="api_create_salespeople"),
    path('salespeople/<int:id>/',api_list_salesperson,name="api_salespeople_detail"),
]
