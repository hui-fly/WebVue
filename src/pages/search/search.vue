<template>
  <div class="container">
    <v-earth/>
    <search-input></search-input>
  </div>
</template>

<script>
import Earth from "../../components/earth";
import SearchInput from "./components/search_input";
const GeoVis = window.GeoVis;
export default {
  name: "Search",
  components:{
    "v-earth":Earth,
    "SearchInput":SearchInput,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container{
        height: 100%;
    }
</style>