<template>
   <div id="container">
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>