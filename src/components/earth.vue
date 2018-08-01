<template>
    <div id="container"></div>
  </div>
</template>

<script>
const GeoVis = window.GeoVis;
export default {
  name: "Earth",
  mounted() {
    window.earth = new GeoVis.Earth("container");
    var layer = new GeoVis.TileLayer(
      "http://geovisweb.oss-cn-shanghai.aliyuncs.com/tiles/googleimg/{z}/{x}/{y}",
      {   
        projection: "EPSG:900913"
      }
    ).addTo(earth.layers);
    // earth.flyTo([120.965448778219,24.79413665,500])
    // console.log(earth.camera.defaultMoveAmount)
    // console.log(earth.camera.defaultZoomAmount)
    // console.log(earth.camera.direction)
    // console.log(earth.camera.defaultLookAmount)
    // earth.camera.lookUp(1)
    // earth.camera.lookRight(1)
    // earth.camera.moveUp(1000000000)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>