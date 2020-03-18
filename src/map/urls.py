
from map.views import index,celljson,xiaoquAoiJson,ajax_poi_list,areas_list,createPolygon

from django.urls import path
urlpatterns = [
    path('', index),
    path('celljson', celljson),
    path('aoijson', xiaoquAoiJson),
    path('poijson',ajax_poi_list),
    path('areasjson',areas_list),
    path('createPolygon',createPolygon),
]
