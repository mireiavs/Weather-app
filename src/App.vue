<template>
  <div id="app" class="background">
      <search></search> 
      <router-view></router-view>
   
  </div>
</template>


<script>
import Search from "@/components/Search.vue"
export default {
    components: {
    Search
  }
}
</script>

  


<style>
.background {
    background-image: url("./assets/background5.jpg");
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%
}
body {
  margin: 0;
  height: 100vh;
}

</style>
