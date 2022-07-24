<template>
    <div class="viewer-body">
        <div class="row">
            <div class="flex md2">
                <analysis-companies-list :selectedCompany="selected" @newSelection="(symbol) => changeSelected(symbol)">
                </analysis-companies-list>
            </div>
            <div class="flex md10">
                <company-page :key="this.selected" v-if="this.selected != ''" :symbol="selected"></company-page>
            </div>
        </div>
    </div>
</template>

<script>
import AnalysisCompaniesList from "./AnalysisCompaniesList";
import CompanyPage from "../Viewer/CompanyPage";


export default {
    components: {
        AnalysisCompaniesList,
        CompanyPage,
    },

    data() {
        return {
            selected: "",
        };
    },

    methods: {
        changeSelected(newCompanySymbol) {
            console.log(newCompanySymbol)
            this.selected = newCompanySymbol;
        },
    },
};
</script>


<style>

.viewer-body {
    max-height: 100%;
    height: 90vh;
}

</style>