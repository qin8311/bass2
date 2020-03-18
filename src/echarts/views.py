from django.shortcuts import render
from django.http import JsonResponse
from .models import Share_json

# Create your views here.

def index(request):
    response = render(request,'echarts/index.html')
    return response
    
def json(request):
    json_data = Share_json.objects.all().values()
    json_list = list(json_data)
    return JsonResponse(json_list,safe=False)