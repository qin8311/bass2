from django.db import models

# Create your models here.

class cell_json(models.Model):
    MARK_ITEMS =[
        (0,'否'),
        (1,'是'),
    ]
    op_date = models.DateTimeField(auto_now_add=False,verbose_name='数据日期')
    zh_label = models.CharField(max_length=128,verbose_name='基站名称')
    lac_id = models.CharField(max_length=32,verbose_name='小区标识')
    cell_id = models.CharField(max_length=32,verbose_name='基站标识')
    cgi = models.CharField(max_length=64,verbose_name='CGI')
    bts_int_id = models.CharField(max_length=128,verbose_name='基站简称')
    net_type = models.CharField(max_length=32,verbose_name='网络类型')
    longitude = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='经度')
    latitude = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='纬度')
    day_new_mark = models.IntegerField(choices=MARK_ITEMS,default=0,verbose_name='日新增标志')
    active_mark = models.IntegerField(choices=MARK_ITEMS,default=0,verbose_name='活跃标志')
    history_mark = models.IntegerField(choices=MARK_ITEMS,default=0,verbose_name='历史标志')
    city_id = models.CharField(max_length=8,verbose_name='区域标识')

    def  __str__(self):
        return self.zh_label

    class Meta:
        verbose_name = verbose_name_plural = '基站数据'

class xiaoqu_aoi_json(models.Model):
    p_id = models.CharField(max_length=16,verbose_name='PID')
    gaode_lng = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='高德经度')
    gaode_lat = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='高德纬度')
    google_lng = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='谷歌经度')
    google_lat = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='谷歌纬度')
    baidu_lng = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='百度经度')
    baidu_lat = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='百度纬度')

    def  __str__(self):
        return self.p_id
    class Meta:
        verbose_name = verbose_name_plural = '小区边界'

class xiaoqu_poi_json(models.Model):
    p_id = models.CharField(max_length=16,verbose_name='PID')
    aoi_name = models.CharField(max_length=128,verbose_name='小区名称')
    type_name = models.CharField(max_length=128,verbose_name='小区类型')
    type_code = models.IntegerField(verbose_name='类型编码')
    addr = models.CharField(max_length=128,verbose_name='小区地址')
    tel = models.CharField(max_length=128,verbose_name='联系电话')
    gaode_lng = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='高德经度')
    gaode_lat = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='高德纬度')
    google_lng = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='谷歌经度')
    google_lat = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='谷歌纬度')
    baidu_lng = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='百度经度')
    baidu_lat = models.DecimalField(max_digits=10, decimal_places=6,verbose_name='百度纬度')
    province_name = models.CharField(max_length=32,verbose_name='省份名称')
    city_code = models.IntegerField(verbose_name='城市代码')
    city_name = models.CharField(max_length=32,verbose_name='城市名称')
    towns_code = models.IntegerField(verbose_name='区域代码')
    towns_name = models.CharField(max_length=32,verbose_name='区域名称')

    def  __str__(self):
        return self.p_id
    class Meta:
        verbose_name = verbose_name_plural = '小区信息'