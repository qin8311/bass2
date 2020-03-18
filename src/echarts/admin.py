# from django.contrib import admin
import xadmin
from xadmin import views

from .models import Share_json
# Register your models here.

class BaseSetting(object):
    """xadmin的基本配置"""
    enable_themes = True      # 开启主题切换功能
    use_bootswatch = True     # 支持切换主题

class GlobalSettings(object):
    """xadmin的全局配置"""
    site_title = "聚合"  # 设置站点标题
    site_footer = "人才有限公司'"  # 设置站点的页脚
    menu_style = "accordion"  # 设置菜单折叠
    
class UserAdmin(object):
    list_display = ['name','cityid','value','usersYD','usersDX','usersLT','shareYD','shareDX','shareLT']

xadmin.site.register(Share_json, UserAdmin)

xadmin.site.register(views.BaseAdminView, BaseSetting)
xadmin.site.register(views.CommAdminView, GlobalSettings)