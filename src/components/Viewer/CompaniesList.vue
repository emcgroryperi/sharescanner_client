<template>
    <div class="company-list">
    <va-sidebar
      :minimized="false"
      textColor="dark"
      width="11rem"
      minimizedWidth="64px"
    >
      <template v-for="company in companies" :key="company.symbol">
        <va-sidebar-item 
            :active="selectedCompany == company.symbol"
            @click="updateSelection(company.symbol)">
          <va-sidebar-item-content>
            <va-sidebar-item-title>
              {{ company.symbol }}
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
            companies: [],
            
        }
    },

    created() {
        HTTP.get('companies')
        .then(response => {
            console.log('Companies retrieved')
            this.companies = response.data
            this.companies.sort((a,b) => {
                if (a.symbol > b.symbol) return 1;
                if (b.symbol > a.symbol) return -1;
                return 0;
            })
        })
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
    height: 80vh;
    margin: 0;
    position: relative;
}

</style>