<template>
    <div class="company-list">
    <va-sidebar
      :minimized="false"
      textColor="dark"
      width="11rem"
      minimizedWidth="64px"
    >
      <template v-for="company in crossovers" :key="company[2]">
        <va-sidebar-item 
            :active="selectedCompany == company[2]"
            @click="updateSelection(company[2])">
          <va-sidebar-item-content>
            <va-sidebar-item-title>
              {{ company[2] }}
            </va-sidebar-item-title>
          </va-sidebar-item-content>
        </va-sidebar-item>
      </template>
    </va-sidebar>
  </div>
</template>

<script>

import {HTTP} from '../../http-common';

import {VaSidebar, VaSidebarItem, VaSidebarItemTitle, VaSidebarItemContent} from 'vuestic-ui';
export default {

    components: {
        VaSidebar,
        VaSidebarItem, 
        VaSidebarItemTitle, 
        VaSidebarItemContent,
    },

    props: {
        selectedCompany: { required: false, type: String }
    },

    data() {
        return {
            crossovers: [],
            
        }
    },

    created() {
        console.log('requesting')
        HTTP.get('ema_crossovers')
        .then(response => {
            console.log('Companies retrieved')
            return JSON.parse(response.data)
        }).then(data => {
          this.crossovers = data.data       
          console.log(data.data) 
          console.log(this.crossovers)  
        })

        // var data = JSON.parse('{"columns":["diff","date","company"],"index":[0,1,2,3,4,5,6,7],"data":[[1.0,"2022-07-22T00:00:00.000Z","WOR.AX"],[1.0,"2022-07-22T00:00:00.000Z","LNK.AX"],[1.0,"2022-07-22T00:00:00.000Z","BFL.AX"],[1.0,"2022-07-22T00:00:00.000Z","DOW.AX"],[1.0,"2022-07-22T00:00:00.000Z","VUK.AX"],[1.0,"2022-07-22T00:00:00.000Z","SGR.AX"],[1.0,"2022-07-22T00:00:00.000Z","PPT.AX"],[1.0,"2022-07-22T00:00:00.000Z","ILU.AX"]]}')
        // this.crossovers = data.data
    },

    methods: {
        updateSelection(symbol) {
            this.$emit('newSelection', symbol)
        }
    }
}



</script>

<style scoped>

.company-list {
    height: 85vh;
    
    position: relative;
    /* padding-left: 20px; */
}

</style>