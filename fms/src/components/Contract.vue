<template>
<div class="container">
    <div class="row">
        <b-tabs class="w-100 my-5">
            <b-tab title="Contract nou" class="w-100" :title-link-class="linkClass(0)" active>
                <div class="d-flex justify-content-center justify-content-md-start justify-content-lg-start">
                    <b-btn class="pr-none my-3 w-auto mr-3" variant="outline-success" block @click="print">Printeaza</b-btn>
                    <b-btn class="pr-none my-3 w-auto mr-3" variant="outline-danger" block @click="reset">Sterge</b-btn>
                </div>
                <vue-editor v-model="contract"></vue-editor>
            </b-tab>
            <b-tab title="Anexa contract" :title-link-class="linkClass(1)">
                <div class="d-flex justify-content-center justify-content-md-start justify-content-lg-start">
                    <b-btn class="pr-none my-3 w-auto mr-3" variant="outline-success" block @click="print">Printeaza</b-btn>
                    <b-btn class="pr-none my-3 w-auto mr-3" variant="outline-danger" block @click="resetAnexa">Sterge</b-btn>
                </div>
                <vue-editor v-model="anexa"></vue-editor>
            </b-tab>
        </b-tabs>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import { VueEditor } from "vue2-editor";
import { contractTemplate } from '@/templates/contract.js'
import { anexaTemplate } from '@/templates/anexa.js'

export default {
    name: 'Contract',
    components: {
        "VueEditor": VueEditor

    },
    data() {
        return {
            tabIndex: 0,
            situatii: [],
            contract: contractTemplate,
            anexa: anexaTemplate
        }
    },
    mounted() {
    },
    created() {
        
    },
    methods: {
        ...mapActions({
            aSituatieLucrari: 'aSituatieLucrari'
        }),
        print() {
            window.print()
        },
        reset(){
            this.contract = contractTemplate;
        },
        resetAnexa() {
            this.anexa = anexaTemplate;
        },
        linkClass(idx) {
            if (this.tabIndex === idx) {
                return ['bg-light', 'color-dark']
            } else {
                return ['bg-light', 'color-dark']
            }
        }
    }
}
</script>

<style >
.color-dark {
    color: #343a40 !important;
}

@media print {
 .quillWrapper .ql-snow.ql-toolbar {
     display: none !important;
 }
 .ql-container.ql-snow {
     border: none !important;
 }
 .nav-tabs {
     display: none !important;
 }
 .pr-none {
     display: none !important;
 }
}
</style>
