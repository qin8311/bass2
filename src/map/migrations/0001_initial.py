# Generated by Django 2.2.1 on 2020-03-08 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='cell_json',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('op_date', models.DateTimeField(verbose_name='数据日期')),
                ('zh_label', models.CharField(max_length=128, verbose_name='基站名称')),
                ('lac_id', models.CharField(max_length=32, verbose_name='小区标识')),
                ('cell_id', models.CharField(max_length=32, verbose_name='基站标识')),
                ('cgi', models.CharField(max_length=64, verbose_name='CGI')),
                ('bts_int_id', models.CharField(max_length=128, verbose_name='基站简称')),
                ('net_type', models.CharField(max_length=32, verbose_name='网络类型')),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=10, verbose_name='经度')),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=10, verbose_name='纬度')),
                ('day_new_mark', models.IntegerField(choices=[(0, '否'), (1, '是')], default=0, verbose_name='日新增标志')),
                ('active_mark', models.IntegerField(choices=[(0, '否'), (1, '是')], default=0, verbose_name='活跃标志')),
                ('history_mark', models.IntegerField(choices=[(0, '否'), (1, '是')], default=0, verbose_name='历史标志')),
                ('city_id', models.CharField(max_length=8, verbose_name='区域标识')),
            ],
            options={
                'verbose_name': '基站数据',
                'verbose_name_plural': '基站数据',
            },
        ),
    ]
