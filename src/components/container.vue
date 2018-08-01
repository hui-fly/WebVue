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
	earth.flyTo([120.965448778219,24.79413665,500])
	var positions_purple =[[120.9653094,24.7938516],[120.9653235,24.7943106],[120.9654948,24.7943063],[120.9654928,24.7942435],[120.9655365,24.7942423],[120.9655816,24.7942014],[120.9655772,24.7940719],[120.965781,24.7940668],[120.965774,24.7938398],[120.9653094,24.7938516]]
    var color_purple = GeoVis.Color.fromCssString("#512da8");
    var outlinecolor_purple = GeoVis.Color.fromCssString("#00acc1");
    var polygon_purple = new GeoVis.Polygon(positions_purple, {
      // onTerrain:true,
      visible:true,
      outline: true,
      outlineColor: outlinecolor_purple,
      fill: true,
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