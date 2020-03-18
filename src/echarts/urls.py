
from echarts.views import index,json

from django.urls import path
urlpatterns = [
    # path('',index),
    path('', index),    
    path('json', json),
]
