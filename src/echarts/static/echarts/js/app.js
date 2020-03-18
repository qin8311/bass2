function randomData() {
    return Math.round(Math.random() * 1000);
}
//开始注册
echarts.extendsMap = function (id, opt) {
    var chart = this.init(document.getElementById(id), 'vintage');
    chart.showLoading();
    var handleEvents = {
        /**
         * i 实例对象
         * o option
         * n 地图名
         **/
        resetOption: function (i, o, n) {
            o.title.subtext = opt.subname+n;
            o.series.mapType = n;
            o.geo.map = n;
            i.clear();
            i.setOption(o);
        }
    };
    var option = {
        title: {
            text: opt.name_title,
            subtext: opt.subname+opt.mapName
        },
        tooltip: {
            show: true,
            formatter: function(params) {
                return params.name + '：' + params.value + '<br/>'+
                        '11111111111111111111'
            },
        },	
        graphic: [{
            type: 'group',
            rotation: Math.PI / -4,
            bounding: 'raw',
            right: 30,
            top: 30,
            // bottom: 110,
            z: 100,
            children: [{
                    type: 'rect',
                    left: 'center',
                    top: 'center',
                    z: 100,
                    shape: {
                        width: 400,
                        height: 50
                    },
                    style: {
                        fill: 'rgba(0,0,0,0.3)'
                    },
                    onclick: function () {
                        handleEvents.resetOption(chart, option, opt.mapName);
                    }
                },
                {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    z: 100,
                    style: {
                        fill: '#fff',
                        text: '返回',
                        font: 'bold 26px Microsoft YaHei'
                    },
                    onclick: function () {
                        handleEvents.resetOption(chart, option, opt.mapName);
                    }
                }
            ]
        }],
        geo: /* 地图基础坐标系 */ {
            map: opt.mapName,
            zoom: 1.2,
        },
        series: {
            type: 'map',
            mapType: opt.mapName,
            zoom: 1.2,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data: opt.data
        },
        visualMap: {
            show: false,
        }
    };
    chart.clear();
    chart.setOption(option);
    // 添加事件
    chart.on('click', function (params) {
        // console.log( params.name );
        var _self = this;
        if (opt.goDown) {
            if (cityMap[params.name]) {
                var url = '/static/echarts/data/' + cityMap[params.name] + '.geojson';
                $.get(url, function (response) {
                    echarts.registerMap(params.name, response);
                    handleEvents.resetOption(chart, option, params.name)
                });
            }
        }
    });
    return chart;
};
var city_code = 540000;
var city_name = '西藏'

$.getJSON('/ec/json', function (dataJson){
    data1 = dataJson
})
$.getJSON('/static/echarts/data/' + city_code + '.geojson', function (geoJson) {
    echarts.registerMap(city_name, geoJson);
    var myChart = echarts.extendsMap('main', {
        //初始化地图
        goDown: true, // 是否下钻
        name_title:"基于Echarts的全区份额数据",
        subname:'BY:秦震\n\n可视化地区:',
        mapName: city_name,
        data: data1
    });
    myChart.hideLoading();
});