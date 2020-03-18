var normalm_TianDiTu = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
  maxZoom: 18,
  minZoom: 5,
  attribution: 'BY:秦震',

});
var normala_TianDiTu = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
  maxZoom: 18,
  minZoom: 5,
  attribution: 'BY:秦震',
});
// var normalm_GaoDe = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
//   maxZoom: 18,
//   minZoom: 5,
//   attribution: 'BY:秦震',
// });
// var normalm_Google = L.tileLayer.chinaProvider('Google.Normal.Map', {
//   maxZoom: 18,
//   minZoom: 5,
//   attribution: 'BY:秦震',
// });


var normal_TianDiTu = L.layerGroup([normalm_TianDiTu, normala_TianDiTu]);
// var normal_GaoDe = L.layerGroup([normalm_GaoDe]);
// var normal_Google = L.layerGroup([normalm_Google]);

// var baseLayers = {
//   "天地图": normal_TianDiTu,
//   "高德地图": normal_GaoDe,
//   "谷歌地图": normal_Google,
// }
// var littleton = L.marker([29.660361, 91.132212]).bindPopup('This is Littleton, CO.'),
//   denver = L.marker([30.037072, 91.091762]).bindPopup('This is Denver, CO.');
// var cities = L.layerGroup([littleton, denver]);

// var overlayLayers = {
//   // '11': cities
// }
var map = L.map("map", {
  center: [29.660361, 91.132212],
  zoom: 12,
  layers: [normal_TianDiTu],
  zoomControl: false
});

var layers = [];
// L.control.layers(baseLayers, overlayLayers).addTo(map);
// L.control.zoom({
//   zoomInTitle: '放大',
//   zoomOutTitle: '缩小'
// }).addTo(map);
// map.invalidateSize(true);

//清除覆盖物
var ClearMap = function () {
  console.log( '1' );
  for (i = 0; i < layers.length; i++) {
    map.removeLayer(layers[i]) //将图层在地图上移除
  }
}

// 绘小区
var createPolygon = function () {
  ClearMap();
  $.ajax("/map/aoijson", {
    dataType: "json",
    success: function (response) {
      var layer = L.geoJSON(response, {
        style: function (feature) {
          switch (feature.properties.party) {
            case 'Republican':
              return {
                color: "#ff0000"
              };
            case 'Democrat':
              return {
                color: "#0000ff"
              };
          }
        }
      }).on({
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
      layers.push(layer.addTo(map));
    }
  });
}

//绘制基站
var createMarker = function () {
  ClearMap();
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
      layers.push(layer.addTo(map));
    }
  });
}

var createinit = function () {
  var control = L.control({
    position: 'topleft'
  });
  control.onAdd = function () {
    var popup = L.DomUtil.create('div');
    // popup.style.width = '350px';
    popup.innerHTML ='<div class="panel panel-default">'+
    '<div class="panel-body">'+
    '<ul class="nav nav-pills">'+
    '  <li role="presentation" class="active"><a href="#">Home</a></li>'+
    '  <li role="presentation"><a href="#">Profile</a></li>'+
    '  <li role="presentation"><a href="#">Messages</a></li>'+
    '</ul>'+
    '</div>'+
    '</div>'   
    // handleMapEvent(popup, this._map);
    return popup;
  };
  control.addTo(map);
};


