<template>
<div class="container">
    <div class="row">
        <b-tabs class="w-100 my-5">
            <b-tab title="Situatie noua" class="w-100" :title-link-class="linkClass(0)" active>
                <h2 class="mt-3">Situatie noua</h2>
                <generate-situatie></generate-situatie>
            </b-tab>
            <b-tab title="Lista" :title-link-class="linkClass(1)">
            </b-tab>
        </b-tabs>
    </div>
</div>
</template>

<script>
import InvoiceService from '@/services/InvoiceService'
import GenerateSituatie from '@/components/GenerateSituatie'

export default {
    name: 'sitLucrari',
    components: {
        "GenerateSituatie": GenerateSituatie
    },
    data() {
        return {
            tabIndex: 0
        }
    },
    mounted() {},
    methods: {
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

<style scoped>
.color-dark {
    color: #343a40 !important;
}
</style>
