from django.urls import path, include
from .views import api_list_customers,api_list_salesperson,api_list_sale


urlpatterns = [
    path('customers/',api_list_customers,name="api_create_customer"),
    path('customers/<int:id>/',api_list_customers,name="api_customer_detail"),
    path('salespeople/',api_list_salesperson,name="api_create_salespeople"),
    path('salespeople/<int:id>/',api_list_salesperson,name="api_salespeople_detail"),
    path('sales/',api_list_sale,name="api_create_sale"),
    path('sales/<int:id>/',api_list_sale,name="api_sale_detail"),
]
