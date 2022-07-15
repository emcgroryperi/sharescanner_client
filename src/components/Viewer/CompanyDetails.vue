<template>
  <div class="company-details">
    <h2 class="company-title">{{ name }} ({{ symbol }})</h2>
    <br>
    <div class="row"> 
        <div class="flex md6">
        <p>Market Cap: ${{ market_cap }}</p>
        </div>
        <div class="flex md6">
        <p>Last Updated: {{ last_updated }}</p>
        </div>
    </div>
  </div>
</template>

<script>


export default {
  props: {
    symbol: { required: true, type: String },
    name: { required: true, type: String },
    market_cap: { required: true, type: Number },
    last_updated: { required: true, type: String },
  },
};
</script>

<style scoped>


.company-details {
    height: 15%
}

.company-title {
    font-size: 30px;
}

.company-row {
    height: 9%
}

</style>