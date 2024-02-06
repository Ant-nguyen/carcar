import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO

# def get_automobiles():
#     response = requests.get("http://inventory-api:8000/api/automobiles/")
#     if response.status_code == 200:
#         content = json.loads(response.content)
#         for auto in content["autos"]:
#             AutomobileVO.objects.update_or_create(
#                 vin=auto["vin"],
#                 sold=auto["sold"],
#             )
#     else:
#         print(f"Failed to get data. Status code: {response.status_code}", file=sys.stderr)

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            url = "http://inventory-api:8000/api/automobiles/"
            reponse = requests.get(url)
            content = json.loads(reponse.content)
            for automobile in content["autos"]:
                AutomobileVO.objects.update_or_create(
                    vin = automobile["vin"],
                    defaults={"sold":automobile["sold"]}
                )
            # Do not copy entire file
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(10)


if __name__ == "__main__":
    poll()
