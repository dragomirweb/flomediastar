<template>
<div>
    <div class="w-100 mt-2">
        <div class="d-flex mt-4 mb-1">
            <div class="d-flex w-100">
                <b-form-input v-model="searchSituations" type="text" placeholder="Cauta situatie"></b-form-input>
            </div>
        </div>
        <div class="invoices">
            <div class="w-100 d-flex justify-content-center mt-5" v-if="filteredSituations.length == 0">
                <h1 class="text-info">Nu s-au gasit situatii! &#x1F600;</h1>
            </div>
            <b-list-group v-for="(situation, index) in filteredSituations" :key="situation.id" class="d-flex" v-if="situations.length !== 0">
                <b-list-group-item class="mb-2">
                    <h3 class="text-uppercase mb-0">{{ situation.situatielucrari.situatie }}</h3>
                    <div class="mt-3">
                        <span class="mr-2 text-grey">
                            <b>Beneficiar: </b>
                            {{ situation.situatielucrari.beneficiar }}
                        </span>
                    </div>
                    <span class="mr-2 text-grey">
                        <b>Situatie emisa la: </b>
                        {{ situation.situatielucrari.data }}
                    </span>
                    <div>
                        <span class="mr-2 text-grey">
                        <b>Total cantitate: </b>
                        {{ situation.situatielucrari.totalCantitate }}
                    </span>
                    </div>
                    <div>
                        <span class="mr-2 text-grey">
                        <b>Total</b>
                        {{ situation.situatielucrari.totalPret }}
                    </span>
                    </div>
                    <div class="d-flex">
                        <button class="btn btn-sm btn-success ml-auto"
                          @click="createPdf(situation)"
                        >
                          PDF
                        </button>
                        <button @click="deleteSitation(situation)" class="btn btn-sm btn-danger ml-1">Delete</button>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</div>
</template>

<script>
import {
    pdfSituations
} from '../pdf/invoice.js'

import {
    mapGetters,
    mapActions
} from 'vuex'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import _ from 'lodash'

export default {
    name: 'SituatieList',
    props: ['situatii'],
    components: {
        "Datepicker": Datepicker,
    },
    data() {
        return {
            situations: [],
            searchSituations: '',
            deleteSituation: Object
        }
    },
    mounted() {
        this.assignSituations()
    },
    updated() {
        if(this.situations != this.gSituatieLucrari){
            this.assignSituations()
        }
    },
    created() {
    },
    methods: {
        ...mapActions({
            deleteStoredSituation: 'deleteStoredSituation',
        }),
        assignSituations() {
           return this.situations = this.gSituatieLucrari;
        },
        createPdf(data) {
            pdfSituations(data)
        },
        deleteSitation(situation) {
            this.deleteSituation = situation;
            this.deleteStoredSituation(situation);
        }
    },
    computed: {
        ...mapGetters({
            gSituatieLucrari: 'gSituatieLucrari',
        }),
        filteredSituations: function () {
            var vm = this;

            if(vm.searchSituations !== '') {
                return _.filter(vm.situations, (function (data) {
                    return data.situatielucrari.situatie.toLowerCase().match(vm.searchSituations.toLowerCase()) ||
                        data.situatielucrari.beneficiar.toLowerCase().match(vm.searchSituations.toLowerCase());
                }));
            } else {
                return _.filter(vm.situations, (function (data) {
                    return true;
                }));
            }
        }
    },
    filters: {
        moment: function (date) {
            return moment(date).format('D-M-YYYY');
        }
    },
    watch: {
        assignSituations() {
                if(this.situations == []){
                    console.log('test')
                }
        }
    }
}
</script>

<style lang="scss" scoped>
.text-grey {
    color: darkgrey;
}
</style>
