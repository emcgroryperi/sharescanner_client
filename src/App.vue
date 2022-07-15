<template>
  <div id="app" class="parent">
    <div class="header">
      <h1 class="website-title">SHARE SCANNER</h1>
    </div>
    <!-- <div class="main">
      <share-viewer></share-viewer>
    </div> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// import ShareViewer from "./components/Viewer/ShareViewer";

export default {
  name: "App",
  components: {
    // ShareViewer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* height: 100vh; */
  background-color: #4d5057;
}

.website-title {
  font-size: 2em;
  color: #CFCFCF; 
  position: relative;
  padding: 2%;
}

.parent {
  height: 100vh;
  width: 100wh;
}

.header {
  background-color: #4E6E5D;
  height: 10%;
}

.main {
  /* background-color: #4d5057; */
  height: 90%;
}

</style>
