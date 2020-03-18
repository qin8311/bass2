from django.db import models


# Create your models here.

class Share_json(models.Model):    
    name = models.CharField(max_length=32,verbose_name='城市名称')
    cityid = models.CharField(max_length=15,verbose_name='城市编码')
    value = models.IntegerField(verbose_name='显示数值')
    usersYD = models.IntegerField(verbose_name='移动用户数')
    usersDX = models.IntegerField(verbose_name='电信用户数')
    usersLT = models.IntegerField(verbose_name='联通用户数')
    shareYD = models.IntegerField(verbose_name='移动份额')
    shareDX = models.IntegerField(verbose_name='电信份额')
    shareLT = models.IntegerField(verbose_name='联通份额')

    def  __str__(self):
        return self.name

    class Meta:
        verbose_name = verbose_name_plural = '份额数据'
