<template>
    <q-page class="column items-center">
        <div class="q-mb-md full-width">
            <div class="text-h4 text-center text-subheadcolour">
                All Orders
            </div>
        </div>
                <q-card class="q-pa-lg q-mb-lg my-card bg-secondary" style="width: 90%">
                    <q-list>
                        <q-separator style="height: 2px"/>
                        <q-item class="q-py-md text-h6 text-bold">
                            <q-item-section class="col-1">
                                Order ID
                            </q-item-section>
                            <q-item-section class="col-3">
                                Order Date
                            </q-item-section>
                            <q-item-section class="col-2">
                                Order Subtotal
                            </q-item-section>
                            <q-item-section class="col-2">
                                Order Status
                            </q-item-section>
                            <q-item-section class="col">
                                Check Details
                            </q-item-section>
                            <q-item-section class="col">
                                Update Status
                            </q-item-section>
                        </q-item>
                        <q-separator style="height: 2px"/>
                        <div v-for="o in order" :key="o.order_id">
                        <q-item class="q-py-md text-h5 text-bold">
                            <q-item-section class="col-1">
                                {{ o.order_id }}
                            </q-item-section>
                            <q-item-section class="col-3">
                                {{ o.order_date }}
                            </q-item-section>
                            <q-item-section class="col-2">
                                RM{{ o.order_price.toFixed(2) }}
                            </q-item-section>
                            <q-item-section class="col-2">
                                <!-- {{ o.order_status }} -->
                                <q-select
                                filled
                                v-model="o.order_status"
                                option-label="desc"
                                :options="stringOptions"
                                style="width: 150px"
                                behavior="menu"
                                bg-color="white"
                                class="text-h7"
                                />
                            </q-item-section>
                            <q-item-section class="col self-start">
                                <q-btn label="Details" color="btn-grey" text-color="btn" @click="openDetailsModel(o)" style="width: 120px"/>
                            </q-item-section>
                            <q-item-section class="col self-start">
                                <q-btn label="Update" color="" text-color="white" @click="updateOrderStatus(o.order_id, o.order_status)" style="width: 120px; background: #193BAA"/>
                            </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                </q-list>
                </q-card>
        
        <div v-for="o in order" :key="o.order_id">
            <q-dialog v-model="o.hMed" >
                <q-card class="" style="width: 1000px; max-width: 110vw;">
                    <q-card-section class="q-py-none">
                        <q-list >
                            <q-item class="text-h6 text-bold">
                                <q-item-section>
                                    Medicine Photo
                                </q-item-section>
                                <q-item-section class="col-4 ">
                                        Medicine Name
                                    </q-item-section>
                                    <q-item-section class="col ">
                                        Unit Price
                                    </q-item-section>
                                    <q-item-section class="col ">
                                        Quantity
                                    </q-item-section>
                                    <q-item-section class="col ">
                                        Total Price
                                    </q-item-section>
                                </q-item>
                                <q-separator/>
                            </q-list>
                    </q-card-section>
                    <q-card-section style="max-height: 60vh" class="scroll">
                        <q-list>
                            <div v-for="hm in historyMeds" :key="hm.medicine_id">
                                <q-item class="q-py-md text-h5">
                                    <q-item-section top>
                                        <div v-if="hm.medicine_photo_name != null" class="col-3">
                                            <q-img
                                                :src="'http://127.0.0.1:8000/storage/uploads/' + hm.medicine_photo_name"
                                                :ratio="4/3"
                                                style="height: 120px; max-width: 130px"
                                                />
                                        </div>
                                        <div v-if="hm.medicine_photo_name == null" class="col-3">
                                            <q-img
                                                :src="'https://img.kpopmap.com/wp-content/uploads_kpopmap/2017/09/chanyeol-min-1.jpg'"
                                                :ratio="4/3"
                                                style="height: 120px; max-width: 130px"
                                            />
                                        </div>
                                    </q-item-section>
                                    <q-item-section top class="col-4">
                                            <div class="q-mx-sm text-h5 text-bold">
                                                {{ hm.medicine_name }}
                                            </div>
                                            
                                    </q-item-section>
                                    <q-item-section top class="col">
                                        <div class=" text-h5">
                                            RM{{ hm.medicine_price.toFixed(2) }}
                                        </div>
                                    </q-item-section>
                                    <q-item-section top class="col">
                                        {{ hm.quantity }}
                                    </q-item-section>
                                    <q-item-section top class="col">
                                        <div class=" text-h5">
                                            RM{{ hm.medTotalPrice.toFixed(2) }}
                                        </div>
                                    </q-item-section>
                                </q-item>
                                <q-separator/>
                            </div>
                            <q-item-section class="column q-pt-sm">
                                <div class="q-mx-sm text-h5 text-bold self-end">
                                    Subtotal ({{ totalQtyCheckout }} items): RM{{ o.order_price.toFixed(2) }}
                                </div>
                            </q-item-section>
                        </q-list>
                    </q-card-section>
                    <q-separator />
                    <q-card-actions align="right">
                        <q-btn label="Close" color="primary" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </q-page>
</template>

<script>
import { ref } from 'vue';
import { Cookies } from "quasar";

const stringOptions = [
  'cart', 'checkout', 'processing', 'completed'
]

export default {
    
    setup() {
        return {
            confirm: ref(false),
            tab: ref('cart'),
            hMed: ref(false),
        }
    },
    data() {
        return {
            order: [],
            history: [],
            cartMeds: [],
            historyMeds:[],
            roleid: "",
            totalQty: 0,
            totalQtyCheckout: 0,
            stringOptions
            
        }
    },
    created() {
        this.getOrder();
        this.getHistory();
        this.getCartMedicines();
        this.getTotalQty();
    },
    methods: {
        visitOrderHistoryPage() {
            console.log(medId);
            this.$router.push({
                name: "orderHistory"
            });
        },
        visitMedicinePage() {
            console.log();
            this.$router.push({
                name: "medicinepat"
            });
        },
        getOrder() {
            this.$axios.get("http://127.0.0.1:8000/api/order",
            {headers: { Authorization: "Bearer" + Cookies.get("token") },}
            ).then(response => {
                this.order = response.data;
                console.log(this.order);
            });
        },
        getHistory() {
            this.$axios.get("http://127.0.0.1:8000/api/orderCheckout",
            {headers: { Authorization: "Bearer" + Cookies.get("token") },}
            ).then(response => {
                this.history = response.data;
                console.log(this.history);
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
        getHistoryMeds(order_id) {
            this.$axios.get("http://127.0.0.1:8000/api/medicinecheckout/" + order_id,
            // {headers: { Authorization: "Bearer" + Cookies.get("token") },}
            ).then(response => {
                this.historyMeds = response.data;
                console.log(response.data);
            });
        },
        async updateMedQty(id, qty) {
            let newQty = {
                quantity: qty
            };
            try {
                const res = await this.$axios.post(
                    `http://127.0.0.1:8000/api/updateQty/` + id, newQty,
                    {
                        headers: { Authorization: "Bearer" + Cookies.get("token") },
                    }
                );
                // this.medicines = res.data;
                this.getCartMedicines();
                this.getOrder();
                this.getTotalQty();
                this.getHistory();
                this.$q.notify("Medicine quantity is updated");
            } catch (error) {
                console.log(error);
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
        async updateOrderStatus(id, status) {
            let newStatus = {
                order_status: status
            };
            try {
                const res = await this.$axios.post(
                    `http://127.0.0.1:8000/api/updateStatus/` + id, newStatus
                );
                // this.medicines = res.data;
                this.getCartMedicines();
                this.getOrder();
                this.getTotalQty();
                this.getHistory();
                this.$q.notify("Order status is updated");
            } catch (error) {
                console.log(error);
            }
        },
        changeCounter: function(num, medicine){
				medicine.quantity += +num
				console.log(medicine.quantity)
				!isNaN(medicine.quantity) && medicine.quantity > 0 ? medicine.quantity : medicine.quantity = 1;
        },
        getTotalQty(){
            this.$axios.get("http://127.0.0.1:8000/api/totalQty",
            {headers: { Authorization: "Bearer" + Cookies.get("token") },}
            ).then(response => {
                this.totalQty = response.data;
                console.log(this.totalQty);
            });
        },
        getTotalQtyCheckout(orderId){
            this.$axios.get("http://127.0.0.1:8000/api/totalQty/" + orderId,
            // {headers: { Authorization: "Bearer" + Cookies.get("token") },}
            ).then(response => {
                this.totalQtyCheckout = response.data;
                console.log(this.totalQtyCheckout);
            });
        },
        async checkout(orderId) {
            
                await this.$axios.post(
                    "http://127.0.0.1:8000/api/checkout/" + orderId
                    // {headers: { Authorization: "Bearer" + Cookies.get("token") },}
                ).then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });
            this.cartMeds = [];
            this.getTotalQty();
            this.getCartMedicines();
            this.getOrder();
            this.getHistory();
            this.$q.notify("Order checkout successfully. Please contact the staff for delivery.");
            this.$router.push({
                name: "cart"
            });
        },
        openDetailsModel(order){
            order.hMed = true;
            this.getHistoryMeds(order.order_id);
            this.getTotalQtyCheckout(order.order_id)
            console.log(this.historyMeds);
            console.log(order.order_id);
        },
        
    },
}

</script>