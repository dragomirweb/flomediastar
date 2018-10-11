<template>
<div class="w-100">
    <b-alert :show="dismissCountDown" dismissible variant="success" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
        <p class="text-center">Situatia a fost salvata ! In  {{dismissCountDown}} secunde o procesez</p>
        <b-progress variant="warning" :max="dismissSecs" :value="dismissCountDown" height="4px">
        </b-progress>
    </b-alert>
    <h3 class="text-center mb-5">{{situatielucrari.situatie}}</h3>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <div v-for="produs in situatielucrari.produse" class="mb-2">
            <b-form-group horizontal breakpoint="lg" label="" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0 border-bottom border-secondary">
                <b-form-group horizontal label="Denumirea" label-class="text-sm-right" class="mb-2">
                    <b-form-input v-model="produs.denumire" type="text" placeholder="Denumirea produsului" required></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="Cantitatea" label-class="text-sm-right" class="mb-2">
                    <b-form-input v-model="produs.cantitatea" placeholder="Cantitatea/buc" type="number"></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="Pret unitar" label-class="text-sm-right">
                    <b-form-input v-model="produs.pret" placeholder="Pret unitar(manopera, transport, utilaj, material)" type="number"></b-form-input>
                </b-form-group>
            </b-form-group>
            </b-form-group>
        </div>
        <b-button type="submit" variant="outline-success">Salveaza situatia</b-button>
        <b-button type="reset" variant="outline-danger">Sterge situatia</b-button>
        <b-button @click="adaugaProdus" variant="outline-primary">Adauga produs</b-button>
        <b-button @click="stergeProdus" variant="outline-danger">Sterge produs</b-button>
    </b-form>
    <div class="d-flex justify-content-end mt-4">
        <div>
            <h3>Total cantitate: {{ situatielucrari.totalCantitate }}</h3>
            <h3>Total pret: {{ situatielucrari.totalPret }}</h3>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions,
    mapMutations
} from 'vuex'
import moment from 'moment'

export default {
    name: 'GenerateSituatie',
    props: ['newFactura', 'invAction', 'editInvoice'],
    data() {
        return {
            situatielucrari: {
                situatie: '',
                data: '',
                produse: [{
                    nrcrt: 0,
                    denumire: '',
                    cantitatea: 0,
                    pret: 0
                }],
                totalCantitate: 0,
                totalPret: 0
            },
            show: true,
            dateAzi: moment(new Date()).format('DD.M.YYYY'),
            dismissSecs: 10,
            dismissCountDown: 0,
            showDismissibleAlert: false
        }
    },
    created() {
        this.setSitLucrari();
    },
    mounted() {
        this.setSitLucrari();
    },
    updated() {
        this.getTotals();
    },
    methods: {
        ...mapActions({
            saveSituatieLucrari: 'saveSituatieLucrari'
        }),
            countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
        onSubmit(evt) {
            evt.preventDefault();
            this.saveSituatieLucrari(this.situatielucrari).then(
                this.situatielucrari = {
                    situatie: '',
                    data: '',
                    produse: [{
                        nrcrt: 0,
                        denumire: '',
                        cantitatea: 0,
                        pret: 0
                    }],
                    totalCantitate: 0,
                    totalPret: 0
                }
            ).then(
                this.setSitLucrari()
            ).then(
                this.dismissCountDown = this.dismissSecs
            ).then(
                setTimeout(() => {
                    this.$router.replace('/')
                }, 10000)
            );
        },
        onReset(evt) {
            evt.preventDefault();
            /* Reset our form values */
            this.situatielucrari.produse = [{
                nrcrt: 0,
                denumire: '',
                cantitatea: 0,
                pret: 0
            }];
            /* Trick to reset/clear native browser form validation state */
            this.show = false;
            this.$nextTick(() => {
                this.show = true
            });
        },
        adaugaProdus() {
            var produse = this.situatielucrari.produse;
            produse.push({
                nrcrt: produse.length + 1,
                denumire: '',
                cantitatea: 0,
                pret: 0
            });
        },
        stergeProdus() {
            this.situatielucrari.produse.splice(-1, 1);
        },
        getTotals() {
            var total = 0;
            var totalCantitate = 0;
            var vm = this;

            vm.situatielucrari.produse.forEach(situatie => {
                let price = parseFloat(situatie.pret).toFixed(2) * parseInt(situatie.cantitatea);
                total += price;
                totalCantitate += parseInt(situatie.cantitatea);
            });
            vm.situatielucrari.totalCantitate = totalCantitate;
            vm.situatielucrari.totalPret = total.toFixed(2);
        },
        setSitLucrari() {
            this.situatielucrari.situatie = 'Situatie lucrari nr.' + (this.gSituatieLucrari.length + 1) + '/' + this.dateAzi;
        }
    },
    computed: {
        ...mapGetters({
            gSituatieLucrari: 'gSituatieLucrari'
        })
    },
    filters: {},
    watch: {
        setSitLucrari() {
            this.situatielucrari.situatie = 'Situatie lucrari nr.' + (this.gSituatieLucrari.length + 1) + '/' + this.dateAzi;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
