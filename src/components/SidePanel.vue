<template> 

    <va-list class="list-group">
        <va-list-label>
            Companies
        </va-list-label>
            
        <va-list-item 
                @click="$emit('newSelection', company.symbol.substr(0, company.symbol.indexOf('.')))" 
                v-for="company in companies" 
                :key="company.symbol"
                color="#23e066">
            <side-panel-item></side-panel-item>
        </va-list-item>
    </va-list>


</template>

<script>
import {HTTP} from '../http-common';

import {VaListItem, VaList, VaListLabel} from 'vuestic-ui';

export default {

    props: {
        selected: String
    },

    components: {
        VaListItem,
        VaList,        
        VaListLabel
    },

    data() {
        return {
            companies: []
        }
    },

    // Fetches companies when created
    created() {
        console.log('Querying for one company')
        HTTP.get('companies')
        .then(response => {
            this.companies = response.data
        })
        .catch(e => {
        this.errors.push(e)
        })
    },

    methods: {
        isSelected(company) {
            console.log(this.selected + ' was selected')
            if (this.selected == company.symbol.substr(0, company.symbol.indexOf('.')))
                return this.selected
            return false
        }
    }

};
</script>

<style>

.list-group{
    max-height: 85vh;
    margin-bottom: 10px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    min-width: min-content;
}


.custom_num {
    width: 200px;
}

.custom_li {
    display: inline-block;
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(200,200,200,1);
    box-shadow: #fff;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color:#fff;
    -webkit-box-shadow: inset 0 0 6px rgba(90,90,90,0.7);
    box-shadow: #fff;
}

.selected { 
    background-color: #23e066;
}

</style>