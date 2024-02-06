import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something

from service_rest.models import AutomobileVO

def get_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    if response.status_code == 200:
        content = json.loads(response.content)
        for auto in content["autos"]:
            AutomobileVO.objects.update_or_create(
                vin=auto["vin"],
                sold=auto["sold"],
            )
    else:
        print(f"Failed to get data. Status code: {response.status_code}", file=sys.stderr)

def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(45)


if __name__ == "__main__":
    poll()
