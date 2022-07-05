<template>
    <div class="viewer-body">
        <va-card>
            <div class="row">
                <div class="flex md12">
                <h1>Share Viewer</h1>
                </div>
            </div>
            <div class="row">
                <div class="flex md2">
                <companies-list 
                    :selectedCompany="selected"
                    @newSelection="(symbol) => changeSelected(symbol)">
                </companies-list>
                </div>
                <div class="flex md9">
                    <company-page :key="this.selected" v-if="this.selected != ''" :symbol="selected" ></company-page>
                </div>
            </div>
        </va-card>
    </div>
</template>

<script>

import CompaniesList from './CompaniesList';
import CompanyPage from './CompanyPage';

import {VaCard} from 'vuestic-ui';


export default {

    components: {
        CompaniesList,
        CompanyPage,
        VaCard,
    },

    data() {
        return {
            selected: ''
        }
    },

    methods: {
        changeSelected(newCompanySymbol) {
            this.selected = newCompanySymbol
        },
    }

}


</script>


<style scoped>

.viewer-body {
    background-color: red;
    margin-top: 5%;
    margin-bottom: 5%;
}

</style>