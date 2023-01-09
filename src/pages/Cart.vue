<template>
    <q-page class="column items-center">
        <div class="q-mb-md full-width">
            <div class="text-h4 text-center text-subheadcolour">
                My Cart
            </div>
        </div>

        <q-card class="q-px-xl q-py-md my-card bg-info" style="width: 70%">
            <q-card-section>
                <div v-for="c in cart" :key="c.order_id">
                    <q-card class="q-pa-md q-mb-lg my-card bg-secondary" style="width: 100%">
                        <q-card-section>
                            {{ c.order_id }}
                            {{ c.order_date }}
                            {{ c.order_price }}

                        </q-card-section>
                    </q-card>
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
            roleid: ""
            
            
        }
    },
    created() {
        this.getCart();
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
        async deleteMedicine(id) {
            try {
                const res = await this.$axios.delete(
                    `http://127.0.0.1:8000/api/medicine/delete/` + id,
                    {
                        headers: { Authorization: "Bearer" + Cookies.get("token") },
                    }
                );
                this.medicines = res.data;
                this.getMedicines();
                this.$q.notify("Medicine deleted successfully");
            } catch (error) {
                console.log(error);
            }
        },
    },
}

</script>