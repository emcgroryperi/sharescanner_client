<template>
  <h1>Share Scanner</h1>
  <va-card>
  <div class="row">
    <div class="flex" style="width: 20%;">
      <side-panel @new-selection="(icon) => handler(icon)"></side-panel>
    </div>
    <div class="flex" style="width: 80%;" v-if="selected!=''"> 
      <company-page :render="true" :icon="selected"></company-page>
    </div>
  </div>
  </va-card>
</template>

<script>

import SidePanel from './components/SidePanel.vue';
import {VaCard} from 'vuestic-ui';
import CompanyPage from '@/components/CompanyPage';

export default {
  name: 'App',
  components: {
    VaCard,
    SidePanel,
    CompanyPage
  },

  data() {
    return {
      selected: ''
    }
  },
  methods: {
    handler(symbol) {
      console.log(symbol)
      this.selected = symbol
    }
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
  margin-top: 60px;
}
</style>
