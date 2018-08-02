<template>
  <div class="container">
    <v-earth/>
    <earth-tool></earth-tool>
    <search-input></search-input>
  </div>
</template>

<script>
import Earth from "../../components/earth";
import SearchInput from "./components/search_input";
import EarthTool from "./components/earth_tool"
const GeoVis = window.GeoVis;
export default {
  name: "Search",
  components:{
    "v-earth":Earth,
    "SearchInput":SearchInput,
    "EarthTool":EarthTool,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container{
        height: 100%;
    }
    .inputclass{
        top: 0rem;
    }
</style>