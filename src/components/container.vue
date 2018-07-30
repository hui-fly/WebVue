<template>
   <v-earth/>
</template>

<script>
import Earth from "./earth"
const GeoVis = window.GeoVis;
export default {
  name: "Container",
  components: {
    "v-earth": Earth
  },
  mounted(){
	earth.flyTo([120.775034,31.28465,1000])
	var positions_purple = [
      [120.775034,31.28465],
      [120.775044,31.28465],
      [120.775044,31.28475],
      [120.775034,31.28475],
      [120.775034,31.28465],
    ]
    var color_purple = GeoVis.Color.fromCssString("#512da8");
    var outlinecolor_purple = GeoVis.Color.fromCssString("#00acc1");
    var polygon_purple = new GeoVis.Polygon(positions_purple, {
      outline: true,
      outlineColor: outlinecolor_purple,
      fill: false,
      fillColor: color_purple,
      extrudedHeight: 0,
      outlineWidth: 2
    }).addTo(earth.features);
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>