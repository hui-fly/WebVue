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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>