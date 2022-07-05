<template>
<div class="parent">
  <h1>Share Scanner</h1>
  <share-viewer></share-viewer>
</div>
</template>

<script>

import ShareViewer from './components/Viewer/ShareViewer';

export default {
  name: 'App',
  components: {
    ShareViewer
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

.parent {
  background-color: green;
  height: 100%;
  width: 100%;
}

h1 {
  font-size: larger;
}

</style>
