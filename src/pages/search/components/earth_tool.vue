<template>
    <div class="earth-tool">
      <span class="iconfont home icon-earth" @click='goHome'></span>
      <span class="iconfont add icon-add1" @click='zoomIn'></span>
      <span class="iconfont jianhao icon-jianhao" @click='zoomOut'></span>
    </div>
</template>

<script>
  var util = {
	goHome:function(){
      earth.camera.flyHome();
      util.clearPolygon()
      return 'home'
	},
	zoomOut:function(){
      earth.camera.zoom('out');  
      return 'out'
    },
    zoomIn:function(){
      earth.camera.zoom('in');
      return 'in';
    },
    clearPolygon:function(){
      if(polygon){
          polygon.removeFrom(earth.features);
            console.log('polygon清除');
      }
      if(marker){
          marker.removeFrom(earth.features);
        console.log('marker清除');
      }
      window.marker = 0;
      window.polygon = 0;//为了在用户点击home时不报错
    },
    polygonpointsToVector2:function(polygonpoints){//二维数组转化为vector2
        let vectorPoints = polygonpoints.forEach((item,index)=>{
            item.x = item[0];
            item.y = item[1];
        })  
        return vectorPoints;
    },
    setLine:function(polygonpoints,styleObj){
       	var fillColor = GeoVis.Color.fromCssString(styleObj.fillColor);   //填充色
        var outlineColor= GeoVis.Color.fromCssString(styleObj.outlineColor);//边框色
        var lineStyle={  //线
         // onTerrain:true,//是否贴地渲染
          visible:styleObj.isVisible||true,
          outline: styleObj.isOutline||true,
          outlineColor: outlineColor,
          fill: styleObj.isFill||false,
          fillColor: fillColor,
          extrudedHeight: styleObj.extrudedHeight||0,
          outlineWidth: styleObj.outlineWidth||2,
   	    };
   	    var polygon = new GeoVis.Polygon(polygonpoints,lineStyle).addTo(earth.features);
    	window.polygon = polygon;
        console.log('划线成功');
   	    return polygon;
    },
    setMarker:function(location,name){
    	var marker = new GeoVis.Marker(location).addTo(earth.features);//描点
    	if(name){
    		marker.bindPopup("<b>"+name+"</b>", {
	            maxWidth: 120,
	        })
	        marker.showPopup();
    	} 	
        window.marker = marker;
        console.log('描点成功')
        return marker;
    },
    getData:async function(queryString,polygonType){
        const url = 'https://nominatim.openstreetmap.org/search/?q='+queryString+'&'+polygonType+'=1&format=json';
        const res = await fetch(url);
        const json = await res.json();
        return json;
    },
  };
export default {
  name: "EarthTool",
  methods:{
    goHome:util.goHome,
    zoomOut:util.zoomOut,
    zoomIn:util.zoomIn,
    clearPolygon:util.clearPolygon
  },
  mounted(){   //这里将变量加载到全局
  	window.marker = 0
  	window.polygon = 0; //为了在用户点击home时不报错
  	window.util = util;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .earth-tool{
      position: absolute;
      display: inline-block;
      left: 4rem;
      top:2rem;
    }
    .home,.add,.jianhao{
      font-size: 3rem;
      margin-left: 2rem;
      color: #fff;
      cursor: pointer;
    }
</style>