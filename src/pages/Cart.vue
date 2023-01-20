<template>
    <q-page class="column items-center">
        <div class="q-mb-md full-width">
            <div class="text-h4 text-center text-subheadcolour">
                My Cart
            </div>
        </div>

        <q-card class="q-px-xl q-py-md my-card bg-info" style="width: 70%">
            <q-card-section>
                <!-- <div v-for="c in cart" :key="c.order_id"> -->
                    <div v-for="m in cartMeds" :key="m.medicine_id">
                    <q-card class="q-pa-md q-mb-lg my-card bg-secondary" style="width: 100%">
                        <q-card-section>
                            <!-- {{ c.order_id }}
                            {{ c.order_date }}
                            {{ c.order_price }} -->
                            <!-- {{ m.medicine_id }} -->
                            <div class="row q-gutter-md justify-center">
                                <div v-if="m.medicine_photo_name != null" class="col-3">
                                    <q-img
                                        :src="'http://127.0.0.1:8000/storage/uploads/' + m.medicine_photo_name"
                                        :ratio="4/3"
                                        style="height: 160px; max-width: 170px"
                                        />
                                    </div>
                                    <div v-if="m.medicine_photo_name == null" class="col-3">
                                        <q-img
                                            :src="'https://img.kpopmap.com/wp-content/uploads_kpopmap/2017/09/chanyeol-min-1.jpg'"
                                            :ratio="4/3"
                                            style="height: 160px; max-width: 170px"
                                        />
                                    </div>
                                    <div class="col column q-gutter-md">
                                    <div class="col row items-start q-pr-md">
                                        <div class="col-9 text-h5 text-bold">
                                            {{ m.medicine_name }}
                                        </div>
                                        <div class="col-1 text-h5">
                                            RM{{ m.medicine_price }}
                                        </div>
                                        
                                    </div>
                                    <div class="col row items-start">
                                        <q-btn class="offset-md-9" label="Delete" color="red-10" @click="m.confirm = true"/>
                                    </div>

                                    
                                </div>
                            
                        </div>
                        </q-card-section>
                    </q-card>
                    <q-dialog v-model="m.confirm" persistent>
                        <q-card>
                            <q-card-section class="row items-center">
                              <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
                                <span class="q-ml-sm">Are you sure you want to remove this medicine from the cart?</span>
                            </q-card-section>

                            <q-card-actions align="right">
                                <q-btn flat label="No" color="primary" v-close-popup />
                                <q-btn flat label="Yes, delete" color="primary" @click="deleteCartMed(m.medicine_id)" />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { ref } from 'vue';
import { Cookies } from "quasar";

export default {
    setup() {
        return {
            confirm: ref(false),
        }
    },
    data() {
        return {
            cart: [],
            cartMeds: [],
            roleid: ""
            
            
        }
    },
    created() {
        this.getCart();
        this.getCartMedicines();
    },
    methods: {
        visitEditPage(medId) {
            console.log(medId);
            this.$router.push({
                name: "editMed",
                params: { id: medId },
            });
        },
        visitAddPage() {
            console.log();
            this.$router.push({
                name: "addMed"
            });
        },
        getCart() {
            this.$axios.get("http://127.0.0.1:8000/api/cart",
            {headers: { Authorization: "Bearer" + Cookies.get("token") },}
            ).then(response => {
                this.cart = response.data;
                console.log(this.cart);
            });
        },
        getCartMedicines() {
            this.$axios.get("http://127.0.0.1:8000/api/cartmedicine",
            {headers: { Authorization: "Bearer" + Cookies.get("token") },}
            ).then(response => {
                this.cartMeds = response.data;
                console.log(this.cartMeds);
            });
        },
        async getMedicine() { //not working
            try {
                const res = await this.$axios.get(
                    `http://127.0.0.1:8000/api/medicine`,
                    {
                        headers: { Authorization: "Bearer" + Cookies.get("token") },
                    }
                );
                this.medicines = res.data;
                console.log(this.medicines);
            } catch (error) {
                console.log(error);
                if (error.response.status == 401) {
                    this.accessDenied = true;
                }
            }
        },
        async deleteCartMed(id) {
            try {
                const res = await this.$axios.delete(
                    `http://127.0.0.1:8000/api/dltcartmed/` + id,
                    {
                        headers: { Authorization: "Bearer" + Cookies.get("token") },
                    }
                );
                // this.medicines = res.data;
                this.getCartMedicines();
                this.$q.notify("Medicine is removed from cart");
            } catch (error) {
                console.log(error);
            }
        },
    },
}

</script>