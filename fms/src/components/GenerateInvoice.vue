<template>
<div>
    <div class="w-100 mt-4">
        <h3 v-if="showClientForm">Date Client</h3>
        <h3 v-if="!showClientForm">Date Factura</h3>

        <b-modal ref="confirmClient" hide-footer title="Datele clientului">
            <div class="d-block">
                <b-list-group>
                    <b-list-group-item class="d-flex">
                        <b>Firma/Nume:</b>
                        <span class="ml-auto">{{ factura.firma }}</span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex">
                        <b>Nr. Reg. Com:</b>
                        <span class="ml-auto">{{ factura.nrRegCom }}</span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex">
                        <b>C.I.F:</b>
                        <span class="ml-auto">{{ factura.cif }}</span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex">
                        <b>Sediul firmei:</b>
                        <span class="ml-auto">{{ factura.sediul }}</span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex">
                        <b>Cont bancar:</b>
                        <span class="ml-auto">{{ factura.contBancar }}</span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex">
                        <b>Banca:</b>
                        <span class="ml-auto">{{ factura.banca }}</span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex">
                        <b>Sucursala:</b>
                        <span class="ml-auto">{{factura.sucursala}}</span>
                    </b-list-group-item>
                </b-list-group>
            </div>
            <div class="d-flex">
                <div class="col-6 pl-0">
                    <b-btn class="mt-3" variant="outline-success" block @click="confirmClient">Salveaza</b-btn>
                </div>
                <div class="col-6 pr-0">
                    <b-btn class="mt-3" variant="outline-danger" block @click="hideConfirmClientModal">Inapoi</b-btn>
                </div>
            </div>
        </b-modal>
        <b-form @submit="onSubmit" @reset="onReset" v-if="showClientForm">
            <b-form-group label="Firma/nume facturata:" label-for="clientFirma" class="mb-1">
                <b-form-input id="clientFirma" type="text" v-model="factura.firma" required placeholder="Firma/Nume">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Nr. Reg. Com:" label-for="clientNrRegCom" class="mb-1">
                <b-form-input id="clientNrRegCom" type="text" v-model="factura.nrRegCom" required placeholder="Nr. Reg. Com">
                </b-form-input>
            </b-form-group>
            <b-form-group label="C.I.F:" label-for="clientCif" class="mb-1">
                <b-form-input id="clientCif" type="text" v-model="factura.cif" required placeholder="C.I.F">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Sediul firmei:" label-for="clientSediul" class="mb-1">
                <b-form-input id="clientSediul" type="text" v-model="factura.sediul" required placeholder="Sediul firmei">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Cont bancar:" label-for="clientContBancar" class="mb-1">
                <b-form-input id="clientContBancar" type="text" v-model="factura.contBancar" required placeholder="Cont bancar">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Banca:" label-for="clientBanca" class="mb-1">
                <b-form-input id="clientBanca" type="text" v-model="factura.banca" required placeholder="Banca">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Sucursala:" label-for="clientSucursala" class="mb-3">
                <b-form-input id="clientSucursala" type="text" v-model="factura.sucursala" required placeholder="Sucursala">
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="outline-success">Adauga produse</b-button>
            <b-button type="reset" variant="outline-danger">Reseteaza client</b-button>
        </b-form>
        <div class="mt-4" v-if="!showClientForm" v-for="product in factura.produse" :key="product.id">
            <b-form-group horizontal breakpoint="lg" label="" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0 border-bottom border-secondary">
                <b-form-group horizontal label="Produs sau serviciu:" label-class="text-sm-right" class="mb-0">
                    <b-form-input v-model="product.descriere" type="text"></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="Unitate monetara:" label-class="text-sm-right" class="mb-2 pt-2">
                    <b-form-radio-group v-model="product.unitate" class="mt-2" :options="['buc', 'mp2', 'role']" />
                </b-form-group>
                <b-form-group horizontal label="Pret unitar:" label-class="text-sm-right" label-for="nestedCity">
                    <b-form-input v-model="product.pret" type="number"></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="Cantitatea:" label-class="text-sm-right" label-for="nestedState">
                    <b-form-input v-model="product.cantitatea" type="number"></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="Valoarea:" label-class="text-sm-right" label-for="nestedState">
                    <b-form-input v-model="product.valoarea" disabled type="number"></b-form-input>
                </b-form-group>

            </b-form-group>
        </div>
        <div class="d-flex flex-column align-items-end justify-content-end my-4 pr-2 border-bottom border-white" v-if="!showClientForm && factura.totalFacturaPlusTva != 0">
            <div class="h5 mb-0"><span class="text-info h4">Total:</span> {{factura.totalFactura.toFixed(2) | formatT}}</div>
            <div class="h5 mb-0"><span class="text-info h4">TVA 19%:</span> {{factura.totalFacturaTva.toFixed(2) | formatT}}</div>
            <div class="h5 mb-0"><span class="text-info h4">Platit:</span> 0</div>
            <div class="h5 "><span class="text-info h4">Total + TVA:</span> {{factura.totalFacturaPlusTva.toFixed(2) | formatT}}</div>
        </div>
        <div class="d-flex">
            <div class="d-flex" v-if="factura.totalFactura != 0 && showClientForm == false">
                <b-btn class="mt-3 w-auto mr-4" variant="outline-primary" block @click="addProduct">Adauga produs</b-btn>
                <b-btn class="mt-3 w-auto mr-4" variant="outline-danger" block @click="removeLastProduct">Sterge ultimul produs</b-btn>
            </div>
            <div class="d-flex ml-auto" v-if="!showClientForm">
                <b-btn v-if="factura.totalFacturaPlusTva != 0" class="mt-3 w-auto mr-4" variant="outline-success" block @click="saveInvoice">Salveaza</b-btn>
                <b-btn class="mt-3 w-auto mr-4" variant="outline-info" block @click="showClientForm = true">Modifica client</b-btn>
                <b-btn class="mt-3 w-auto" variant="outline-danger" block @click="resetGenerateInvoice">Renunta</b-btn>
            </div>
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

export default {
    name: 'GenerateInvoice',
    props: ['newFactura', 'invAction', 'editInvoice'],
    data() {
        return {
            factura: {
                factura: '',
                firma: '1',
                data: new Date,
                nrRegCom: '1',
                cif: '1',
                sediul: '1',
                contBancar: '1',
                banca: '1',
                sucursala: '1',
                produse: [{
                    descriere: 'Prestari servicii',
                    unitate: '',
                    pret: 0,
                    cantitatea: 0,
                    valoarea: 0
                }],
                totalFactura: 0,
                totalFacturaTva: 0,
                totalFacturaPlusTva: 0
            },
            showClientForm: true
        }
    },
    created() {
    },
    mounted() {
        if (this.invAction === 'newInvoice') {
            this.generateNewInvoiceWithData;
        } else if (this.invAction === 'editInvoice'){
            this.editCurrentInvoice;
        }
    },
    updated() {
        this.normalizeProducts()
        this.getTotals()
    },
    methods: {
        ...mapActions({
            addNewInvoice: 'addNewInvoice'
        }),
        onSubmit(evt) {
            evt.preventDefault();
            // alert(JSON.stringify(this.form));
            this.showConfirmClientModal()
        },
        onReset(evt) {
            evt.preventDefault();
            /* Reset our form values */
            this.factura.firma = '';
            this.factura.nrRegCom = '';
            this.factura.cif = '';
            this.factura.sediul = '';
            this.factura.contBancar = '';
            this.factura.banca = '';
            this.factura.sucursala = '';
            /* Trick to reset/clear native browser form validation state */
            this.showClientForm = false;
            this.$nextTick(() => {
                this.showClientForm = true
            });
        },
        showConfirmClientModal() {
            this.$refs.confirmClient.show()
        },
        hideConfirmClientModal() {
            this.$refs.confirmClient.hide()
        },
        confirmClient() {
            this.$refs.confirmClient.hide();
            this.showClientForm = false;
        },
        addProduct() {
            this.factura.produse.push({
                descriere: 'Prestari servicii',
                unitate: '',
                pret: 0,
                cantitatea: 0,
                valoarea: 0
            });
        },
        removeLastProduct() {
            this.factura.produse.splice(-1, 1);
        },
        normalizeProducts() {
            this.factura.produse.forEach(el => {
                el.valoarea = parseFloat(el.pret) * parseInt(el.cantitatea);
                el.cantitatea = parseFloat(el.cantitatea);
                el.pret = parseFloat(el.pret);
            });
        },
        getTotals() {
            var total = 0;
            var vm = this;

            vm.factura.produse.forEach(el => {
                total += el.valoarea;
            });
            vm.factura.totalFactura = parseFloat(total);
            vm.factura.totalFacturaTva = vm.factura.totalFactura * 0.19;
            vm.factura.totalFacturaPlusTva = vm.factura.totalFactura + vm.factura.totalFacturaTva;
        },
        saveInvoice(){
            if(this.invAction === 'newInvoice'){
                this.factura.factura = 'factura-' + this.getInvoices.length;
                this.addNewInvoice({factura: this.factura})
            } else if(this.invAction === 'editInvoice'){
                this.$store.state.editInvoice = false;
            } else {
                this.addNewInvoice({factura: this.factura})
            }
        },
        resetGenerateInvoice(){
            if(this.invAction === 'newInvoice'){
                this.$store.state.newInvoiceFromDetails = false;
            } else if(this.invAction === 'editInvoice'){
                this.$store.state.editInvoice = false;
            } else {
                this.showClientForm = true;
            }

        }
    },
    computed: {
        ...mapGetters({
            getInvoices: 'getInvoices',
        }),
        generateNewInvoiceWithData(){
            const data = this.newFactura.factura;
            let newData = this.factura;

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    newData[key] = data[key]
                }
            };
        },
        editCurrentInvoice(){
            const data = this.editInvoice.factura;
            this.factura = data;
        }
    },
    filters: {
        formatT(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
