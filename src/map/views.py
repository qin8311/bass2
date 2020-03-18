from django.shortcuts import render
from .models import cell_json,xiaoqu_aoi_json,xiaoqu_poi_json
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from django.db import connection
from django.views.decorators.gzip import gzip_page

import pandas as pd
import geopandas as gpd
from sqlalchemy import create_engine

# Create your views here.
def index(request):
    response = render(request,'map/index.html')
    return response

@gzip_page
def celljson(request):
    datajson = {}
    ret = cell_json.objects.all().values('zh_label','longitude','latitude','lac_id','cell_id','cgi','net_type')
    datajson["type"] = 'FeatureCollection'
    datajson["features"] = []
    for i in ret:
        data = {}
        data["type"]="Feature"
        data["properties"]={}    
        data["properties"]["name"]=i.get('zh_label')
        data["properties"]["lac_id"]=i.get('lac_id')
        data["properties"]["cell_id"]=i.get('cell_id')
        data["properties"]["cgi"]=i.get('cgi')
        data["properties"]["net_type"]=i.get('net_type')
        data["geometry"]={}
        data["geometry"]["type"]='Point'
        data["geometry"]["coordinates"]=[]
        data["geometry"]["coordinates"].append(i.get('longitude'))
        data["geometry"]["coordinates"].append(i.get('latitude'))
        datajson["features"].append(data)

    return JsonResponse(datajson, safe=False)

@gzip_page
def xiaoquAoiJson(request):
    datajson = {}    
    datajson["type"] = 'FeatureCollection'
    datajson["features"] = []
    with connection.cursor() as cursor:
        cursor.execute("select p_id , GROUP_CONCAT(google_lng||','||google_lat ,';') as latlng  from map_xiaoqu_aoi_json GROUP BY p_id")
        for row in cursor.fetchall():
            pid = row[0]
            latlng = row[1].split(';')   
            data = {}
            data["type"]="Feature"
            data["properties"]={}    
            data["properties"]["name"]=pid
            data["geometry"]={}
            data["geometry"]["type"]='Polygon'
            data["geometry"]["coordinates"]=[]
            ll=[] 
            for i in iter(latlng):             
                s = i.split(',')
                ll.append(list(map(float, s)))
            data["geometry"]["coordinates"].append(ll)            
            datajson["features"].append(data)
    return JsonResponse(datajson, safe=False)

def ajax_poi_list(request):
    pid = request.GET.get('pid')
    json_data = xiaoqu_poi_json.objects.filter(p_id=pid).values()
    json_list = list(json_data)
    return JsonResponse(json_list, safe=False)

@gzip_page
def areas_list(request):
    engine = create_engine("postgresql://postgres:111111@localhost:5432/map",encoding = "utf-8")
    sql = '''SELECT code,name,lv,lv_code FROM xz_map_info where lv in ('1','2','3') ORDER BY lv,code '''
    # df = gpd.read_postgis(sql,engine,crs = 4326)
    df = pd.read_sql_query(sql,engine)
    ls =[]
    for index, row in df.iterrows():
        datajson = {}
        datajson['id'] = row['code']
        datajson['cname'] = row['name']
        datajson['level'] = row['lv']
        datajson['upid'] = row['lv_code']
        ls.append(datajson)
    return JsonResponse(ls, safe=False)

@gzip_page
def createPolygon(request):
    pid = request.GET.get('pid')
    engine = create_engine("postgresql://postgres:111111@localhost:5432/map",encoding = "utf-8")
    sql = "SELECT code,name,lv_name,geom FROM xz_map_info where lv_code='%s' "% pid
    # df = gpd.GeoDataFrame.from_postgis(sql,"postgresql://postgres:111111@localhost:5432/map",crs=4326)
    df = gpd.read_postgis(sql,engine,crs = 4326)
    datajson = df.to_json()    
    return JsonResponse(eval(datajson), safe=False)
