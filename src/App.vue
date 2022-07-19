<template>
  <div id="app" class="parent">
    <div class="header">
      <h1 class="website-title">SHARE SCANNER</h1>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/viewer">Viewer</router-link>
      </div>
    </div>
    <router-view></router-view>
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
  color: #cfcfcf;
  position: relative;
  padding-top: 2%;
  padding-bottom: 0.5%;
}

.parent {
  height: 100vh;
  width: 100wh;
}

.header {
  background-color: #4e6e5d;
  height: 10%;
}

.main {
  /* background-color: #4d5057; */
  height: 90%;
}
</style>
