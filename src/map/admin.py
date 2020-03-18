# from django.contrib import admin
import xadmin
from .models import cell_json,xiaoqu_aoi_json,xiaoqu_poi_json

# Register your models here.
class CellAdmin(object):
    list_display = ['op_date','zh_label','lac_id','cell_id','cgi','bts_int_id','net_type',
    'longitude','latitude','day_new_mark','active_mark','history_mark','city_id']
class XiaoquAoiAdmin(object):
    list_display = ['p_id','gaode_lng','gaode_lat','google_lng','google_lat','baidu_lng','baidu_lat']
class XiaoquPoiAdmin(object):
    list_display = ['p_id','aoi_name','type_name','type_code','addr','tel','gaode_lng',
    'gaode_lat','google_lng','google_lat','baidu_lng','baidu_lat','province_name'
    ,'city_code','city_name','towns_code','towns_name']


xadmin.site.register(cell_json, CellAdmin)
xadmin.site.register(xiaoqu_aoi_json, XiaoquAoiAdmin)
xadmin.site.register(xiaoqu_poi_json, XiaoquPoiAdmin)