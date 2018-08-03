<template>
  <div class="search-container">
    <v-earth/>
    <earth-tool></earth-tool>
    <search-input></search-input>
    <camera></camera>
  </div>
</template>

<script>
import Earth from "../../components/earth";
import SearchInput from "./components/search_input";
import EarthTool from "./components/earth_tool";
import Camera from './components/camera'
const GeoVis = window.GeoVis;
export default {
  name: "Search",
  components:{
    "v-earth":Earth,
    "SearchInput":SearchInput,
    "EarthTool":EarthTool,
    "Camera":Camera,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .search-container{
        height: 100%;
    }
    .inputclass{
        top: 0rem;
    }
</style>