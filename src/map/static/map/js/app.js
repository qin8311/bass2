var ver = 'with © qinz  | Map Data © qinz'
var normalm_TianDiTu = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
  maxZoom: 18,
  minZoom: 5,
  attribution: ver,
});
var normala_TianDiTu = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
  maxZoom: 18,
  minZoom: 5,
  attribution: ver,
});
var normal_TianDiTu = L.layerGroup([normalm_TianDiTu, normala_TianDiTu]);
var map = L.map("map", {
  center: [29.660361, 91.132212],
  zoom: 12,
  layers: [normal_TianDiTu],
  zoomControl: false
});

var layers = {};
//清除覆盖物
var ClearMap = function () {
  for (var key in layers) {
    // console.log(key + ":" + layers[key]);
    map.removeLayer(layers[key])
    // layers[key].remove(map )
  }
}
// 绘小区
var createPolygon = function () {
  if (layers["Polygon"] != null) {
    map.removeLayer(layers["Polygon"])
  }
  $.ajax("/map/aoijson", {
    dataType: "json",
    success: function (response) {
      var layer = L.geoJSON(response, {
        style: function (feature) {}
      }).on({
        // mouseover: highlight, //鼠标移动上去高亮
        // mouseout: resetHighlight, //鼠标移出恢复原样式
        mousedown: function (e) {
          name = e.layer.feature.properties.name;
          $.get("/map/poijson", {
            'pid': name
          }, function (ret) {
            info = ret[0];
            var str = "<h4>小区名称：" + info.aoi_name + "</h4>" + "<table>" +
              "<tr><th>小区地址：</th><th>" + info.addr + "</th></tr>" +
              "<tr><th>城市名称：</th><th>" + info.city_name + "</th></tr>" +
              "<tr><th>区域名称：</th><th>" + info.towns_name + "</th></tr>" +
              "<tr><th>tel：</th><th>" + info.tel + "</th></tr>" +
              "</table>";
            e.layer.bindPopup(str);
          })
        }
      });
      layers["Polygon"] = layer.addTo(map);
    }
  });
}

//绘制基站
var createMarker = function () {
  if (layers["Marker"] != null) {
    map.removeLayer(layers["Marker"])
  }
  $.ajax("/map/celljson", {
    dataType: "json",
    success: function (response) {
      var geojsonMarkerOptions = {
        radius: 5,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      var layer = L.geoJSON(response, {
        pointToLayer: function (feature, latlng) {
          // console.log( latlng );
          return L.circleMarker(latlng, geojsonMarkerOptions);
        },
      }).on({
        mousedown: function (e) {
          name = e.layer.feature.properties.name;
          lac_id = e.layer.feature.properties.lac_id;
          cell_id = e.layer.feature.properties.cell_id;
          cgi = e.layer.feature.properties.cgi;
          net_type = e.layer.feature.properties.net_type;
          var str = "<h4>基站名称：" + name + "</h4>" + "<table>" +
            "<tr><th>LAC_ID：</th><th>" + lac_id + "</th></tr>" +
            "<tr><th>CELL_I：</th><th>" + cell_id + "</th></tr>" +
            "<tr><th>CGI：</th><th>" + cgi + "</th></tr>" +
            "<tr><th>网络类型：</th><th>" + net_type + "</th></tr></table>";
          e.layer.bindPopup(str);
        }
      });
      layers["Marker"] = layer.addTo(map);
    }
  });
}

//行政区域
var createControl = function () {
  if (layers["control"] != null) {
    layers["control"].remove(map)
  }
  var layer = L.control({
    position: 'topleft'
  });
  layer.onAdd = function () {
    var popup = L.DomUtil.create('div');
    popup.innerHTML = '<div class="panel panel-default">' +
      '<div class="panel-body">' +
      '<!--  省市区三级联动 begin -->' +
      '<div class="form-group">' +
      '	<label for="address">地区</label>' +
      '	<button type="button" class="close" aria-label="Close" onclick="closeControl()"><span aria-hidden="true">&times;</span></button>' +
      '	<div class="bs-chinese-region flat dropdown" data-min-level="1" data-max-level="3" data-def-val="[name=address]">' +
      '		<input type="text" class="form-control" id="address" placeholder="选择你的地区" data-toggle="dropdown" readonly="">' +
      '		<input type="hidden" class="form-control" name="address" value="540000">' +
      '		<div class="dropdown-menu" role="menu" aria-labelledby="dLabel">' +
      '			<div>' +
      '				<ul class="nav nav-tabs" role="tablist">' +
      '					<li role="presentation" class="active"><a href="#province" data-next="city" role="tab" data-toggle="tab">省份</a></li>' +
      '					<li role="presentation"><a href="#city" data-next="district" role="tab" data-toggle="tab">城市</a></li>' +
      '					<li role="presentation"><a href="#district" data-next="street" role="tab" data-toggle="tab">县区</a></li>' +
      '				</ul>' +
      '				<div class="tab-content">' +
      '					<div role="tabpanel" class="tab-pane active" id="province">--</div>' +
      '					<div role="tabpanel" class="tab-pane" id="city">--</div>' +
      '					<div role="tabpanel" class="tab-pane" id="district">--</div>' +
      '				</div>' +
      '			</div>' +
      '		</div>' +
      '	</div>' +
      '</div>'
    '<!-- 省市区三级联动  end-->' +
    '</div>' +
    '</div>'
    return popup;
  }
  layers["control"] = layer.addTo(map);
  loadareas()
};

//关闭行政区域菜单
var closeControl = function () {
  if (layers["control"] != null) {
    layers["control"].remove(map)
  }
}

//选择地图区域
var loadareas = function () {
  $.getJSON('/map/areasjson', function (data) {
    for (var i = 0; i < data.length; i++) {
      var area = {
        id: data[i].id,
        name: data[i].cname,
        level: data[i].level,
        parentId: data[i].upid
      };
      data[i] = area;
    }
    $('.bs-chinese-region').chineseRegion('source', data).on('completed.bs.chinese-region', function (e, areas) {
      $(this).find('[name=address]').val(areas[areas.length - 1].id);
      $.get("/map/createPolygon", {
        'pid': areas[areas.length - 1].id
      }, function (response) {
        if (layers["areas"] != null) {
          map.removeLayer(layers["areas"])
        }
        var myStyle = {
          "color": "#ff7800",
          "weight": 2,
          "opacity": 0.45
        };
        var layer = L.geoJSON(response, {
          style: myStyle
        }).on({
          mousedown: function (e) {
            code = e.layer.feature.properties.code;
            name = e.layer.feature.properties.name;
            var str = "<h4>名称：" + name + "</h4>(" + code + ")"
            e.layer.bindPopup(str);
            // console.log(name);
          }
        });
        map.flyToBounds(layer.getBounds());
        layers["areas"] = layer.addTo(map);
      });
    });
  });
}