<template>
    <q-page class="column items-center">
        <div class="q-mb-md full-width">
            <div class="text-h4 text-center text-subheadcolour">
                My Cart
            </div>
            <!-- <div class="column items-center q-my-md">
                <q-btn label="Order History" color="btn" text-color="btn" @click="visitOrderHistoryPage()" style="width: 15%" />
            </div> -->
        </div>
        <q-card class="q-px-xl q-pb-md my-card bg-info" style="width: 90%">
            <q-card-section>
                <!-- <div v-for="c in cart" :key="c.order_id"> -->
                    <q-tabs v-model="tab" align="left" >
                        <q-tab name="cart" label="Cart" />
                        <q-tab name="history" label="Order History" />
                    </q-tabs>
                    <q-tab-panels v-model="tab" swipeable>
                        <q-tab-panel name="cart" class="bg-secondary">

                        
                    <div v-if="cartMeds.length==0" class="text-h6">
                        Your cart is empty. Go to 
                        <span 
                        id=""
                        class="text-h6 cursor-pointer underline-on-hover"
                        @click="visitMedicinePage()">
                            medicine page
                        </span> now.
                    </div>
                    <q-card v-else flat class=" my-card bg-secondary" style="width: 100%">
                        
                        <q-card-section >
                            <q-list>
                                <q-separator></q-separator>
                                <q-item>
                                    <q-item-section class="text-h6 text-bold">
                                        Medicine Photo
                                    </q-item-section>
                                    <q-item-section class="col-4 text-h6 text-bold">
                                        Medicine Name
                                    </q-item-section>
                                    <q-item-section class="col text-h6 text-bold">
                                        Unit Price
                                    </q-item-section>
                                    <q-item-section class="col text-h6 text-bold">
                                        Quantity
                                    </q-item-section>
                                    <q-item-section class="text-h6 text-bold">
                                        Action
                                    </q-item-section>
                                    <q-item-section class="col text-h6 text-bold">
                                        Total Price
                                    </q-item-section>
                                </q-item>
                                <q-separator></q-separator>
                                <div v-for="m in cartMeds" :key="m.medicine_id" >
                            <!-- <div class="row q-gutter-md justify-center"> -->
                                <q-item class="q-py-md">
                                    <q-item-section top>
                                        <div v-if="m.medicine_photo_name != null" class="col-3">
                                            <q-img
                                                :src="'http://127.0.0.1:8000/storage/uploads/' + m.medicine_photo_name"
                                                :ratio="4/3"
                                                style="height: 120px; max-width: 130px"
                                                />
                                        </div>
                                        <div v-if="m.medicine_photo_name == null" class="col-3">
                                            <q-img
                                                :src="'https://img.kpopmap.com/wp-content/uploads_kpopmap/2017/09/chanyeol-min-1.jpg'"
                                                :ratio="4/3"
                                                style="height: 120px; max-width: 130px"
                                            />
                                        </div>
                                    </q-item-section>
                                    <q-item-section top class="col-4">
                                            <div class="q-mx-sm text-h5 text-bold">
                                                {{ m.medicine_name }}
                                            </div>
                                            
                                    </q-item-section>
                                    <q-item-section top class="col">
                                        <div class=" text-h5">
                                            RM{{ m.medicine_price.toFixed(2) }}
                                        </div>
                                    </q-item-section>
                                    <q-item-section top class="col">
                                        <div class="pmwrapper ">
                                            <button class="pmbtn btn--minus" @click="changeCounter('-1', m)" type="button" name="button">
                                            -
                                            </button>
                                            <input class="quantity" type="text" name="name" :value="m.quantity">
                                            <button class="pmbtn btn--plus" @click="changeCounter('1', m)" type="button" name="button">
                                              +
                                            </button>
                                        </div>
                                    </q-item-section>
                                    <q-item-section top class="column q-mr-md q-gutter-md">
                                        <q-btn label="Update" color="btn-grey" text-color="btn" @click="updateMedQty(m.medicine_id, m.quantity)"/>
                                        <q-btn  label="Delete" color="red-10" @click="m.confirm = true"/>
                                    </q-item-section>
                                    <q-item-section top class="col">
                                        <div class=" text-h5">
                                            RM{{ m.medTotalPrice.toFixed(2) }}
                                        </div>
                                    </q-item-section>
                                </q-item>
                                
                                <!-- </div> -->
                            
                        
                    
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
                    <q-separator></q-separator>
                </div>
                <q-item>
                    <q-item-section class="column q-pt-sm">
                        <div v-for="c in cart" :key="c.order_id" class="q-mx-sm text-h5 text-bold self-end">
                            Subtotal ({{ totalQty }} items): RM{{ c.order_price.toFixed(2) }}
                            <div class="q-pt-md">
                                <q-btn class="btn-checkout" label="Checkout" @click="checkout(c.order_id)"/>
                            </div>
                        </div>
                    </q-item-section>
                </q-item>
            </q-list>
                    </q-card-section>
                </q-card>
            </q-tab-panel>
            <q-tab-panel name="history" class="bg-secondary">
                <q-card flat class=" my-card bg-secondary" style="width: 100%">
                    <div v-if="history.length == 0" class="text-h6">
                        No order history yet.
                    </div>
                    <q-list v-else>
                        <q-separator></q-separator>
                        <q-item class="q-py-md text-h6 text-bold">
                            <q-item-section class="col-3">
                                Order Date
                            </q-item-section>
                            <q-item-section class="col-3">
                                Order Subtotal
                            </q-item-section>
                            <q-item-section class="col-3">
                                Order Status
                            </q-item-section>
                            <q-item-section class="">
                                Check Details
                            </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                        <div v-for="h in history" :key="h.order_id">
                        <q-item class="q-py-md text-h5 text-bold">
                            <q-item-section class="col-3">
                                {{ h.order_date }}
                            </q-item-section>
                            <q-item-section class="col-3">
                                RM{{ h.order_price.toFixed(2) }}
                            </q-item-section>
                            <q-item-section class="col-3">
                                {{ h.order_status }}
                            </q-item-section>
                            <q-item-section class="col-1 self-start">
                                <q-btn label="Details" color="btn-grey" text-color="btn" @click="openDetailsModel(h)"/>
                            </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                </q-list>
                </q-card>
            </q-tab-panel>
            </q-tab-panels>
            </q-card-section>
        </q-card>
        
        <div v-for="h in history" :key="h.order_id">
            <q-dialog v-model="h.hMed" >
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
                            <!-- <q-separator></q-separator>
                                <q-item>
                                    <q-item-section class="text-h6 text-bold">
                                        Medicine Photo
                                    </q-item-section>
                                    <q-item-section class="col-4 text-h6 text-bold">
                                        Medicine Name
                                    </q-item-section>
                                    <q-item-section class="col text-h6 text-bold">
                                        Unit Price
                                    </q-item-section>
                                    <q-item-section class="col text-h6 text-bold">
                                        Quantity
                                    </q-item-section>
                                    <q-item-section class="col text-h6 text-bold">
                                        Total Price
                                    </q-item-section>
                                </q-item> -->
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
                                    Subtotal ({{ totalQtyCheckout }} items): RM{{ h.order_price.toFixed(2) }}
                                    <!-- <div class="q-pt-md">
                                        <q-btn class="btn-checkout" label="Checkout" @click="checkout(c.order_id)"/>
                                    </div> -->
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
        <!-- <q-card class="q-px-xl q-py-md my-card bg-info" style="width: 70%">
            <q-card-section>
                    <div v-if="cartMeds.length==0" class="text-h6">
                        Your cart is empty. Go to 
                        <span 
                        id=""
                        class="text-h6 cursor-pointer underline-on-hover"
                        @click="visitMedicinePage()">
                            medicine page
                        </span> now.
                    </div>
                    <div v-for="m in cartMeds" :key="m.medicine_id">
                        
                    <q-card class="q-pa-md q-mb-lg my-card bg-secondary" style="width: 100%">
                        <q-card-section>
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
                                    <div class="col row items-start q-pr-lg">
                                        <div class="col-9 text-h5 text-bold">
                                            {{ m.medicine_name }}
                                        </div>
                                        <div class="col-1 text-h5">
                                            RM{{ m.medicine_price.toFixed(2) }}
                                        </div>
                                        
                                    </div>
                                    
                                    <div class="col row items-start q-gutter-md">
                                            <div class="wrapper col-grow">
                                                <button class="pmbtn btn--minus" @click="changeCounter('-1', m)" type="button" name="button">
                                                -
                                                </button>
                                                <input class="quantity" type="text" name="name" :value="m.quantity">
                                                <button class="pmbtn btn--plus" @click="changeCounter('1', m)" type="button" name="button">
                                                  +
                                                </button>
                                            </div>
                                        <q-btn label="Update" color="btn-grey" text-color="btn" @click="updateMedQty(m.medicine_id, m.quantity)"/>
                                        <q-btn class="q-mr-md" label="Delete" color="red-10" @click="m.confirm = true"/>
                                    </div>

                                    
                                </div>
                            
                        </div>
                        </q-card-section>
                    </q-card>
                    <q-dialog v-model="m.confirm" persistent>
                        <q-card>
                            <q-card-section class="row items-center">
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
        </q-card> -->
    </q-page>
</template>

<script>
import { ref } from 'vue';
import { Cookies } from "quasar";


export default {
    setup() {
        return {
            confirm: ref(false),
            tab: ref('cart'),
            hMed: ref(false),
            // quantity: 1
        }
    },
    data() {
        return {
            cart: [],
            history: [],
            cartMeds: [],
            historyMeds:[],
            roleid: "",
            totalQty: 0,
            totalQtyCheckout: 0
            
        }
    },
    created() {
        this.getCart();
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
        getCart() {
            this.$axios.get("http://127.0.0.1:8000/api/cart",
            {headers: { Authorization: "Bearer" + Cookies.get("token") },}
            ).then(response => {
                this.cart = response.data;
                console.log(this.cart);
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
                this.getCart();
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
            this.getCart();
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