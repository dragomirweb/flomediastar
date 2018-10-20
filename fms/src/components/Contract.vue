<template>
<div class="container">
    <div class="row">
        <b-tabs class="w-100 my-5">
            <b-tab title="Contract nou" class="w-100" :title-link-class="linkClass(0)" active>
                <h2 class="mt-3">Situatie noua</h2>
                <button @click="test('test')">Test</button> 
            </b-tab>
            <b-tab title="Lista contracte" :title-link-class="linkClass(1)" v-if="situatii.length != 0">
            </b-tab>
        </b-tabs>
    </div>
</div>
</template>

<script>
import InvoiceService from '@/services/InvoiceService'
import { contract } from '../pdf/contract.js'
import GenerateSituatie from '@/components/GenerateSituatie'
import SituatieList from '@/components/SituatieList'
import { mapActions } from 'vuex';

export default {
    name: 'sitLucrari',
    components: {
        "GenerateSituatie": GenerateSituatie,
        "SituatieList": SituatieList

    },
    data() {
        return {
            tabIndex: 0,
            situatii: []
        }
    },
    mounted() {
        this.getApiSituatie()
    },
    created() {
        
    },
    methods: {
        ...mapActions({
            aSituatieLucrari: 'aSituatieLucrari'
        }),
        test(param) {
            contract(param)
        },
        linkClass(idx) {
            if (this.tabIndex === idx) {
                return ['bg-light', 'color-dark']
            } else {
                return ['bg-light', 'color-dark']
            }
        },
        async getApiSituatie() {
           const r = await InvoiceService.fetchSituatieLucrari();
           this.situatii = r.data;
           if(r.status == 200){
               this.aSituatieLucrari(r.data)
           }
           
        }
    }
}
</script>

<style>
.color-dark {
    color: #343a40 !important;
}
</style>
