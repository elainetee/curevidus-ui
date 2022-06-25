<template>
    <q-page class="column items-center">
        <div class="q-mb-md full-width">
            <div class="text-h4 text-center text-subheadcolour">
                My Condition Report
                <!-- <div class="text-h5 text-subheadcolour">
                    Day 5 of Quarantine
                </div> -->
            </div>
            <div class="column items-center q-my-md">
                <q-btn label="Update Condition" color="btn" text-color="btn"
                    @click="visitUpdatePage(this.$route.params.id)" style="width: 15%" />
            </div>
        </div>

        <q-card class="q-px-xl q-py-md my-card bg-info" style="width: 70%">
            <q-card-section>
                <div v-for="condition in conditions" :key="condition.id">
                    <q-card class="q-pa-md q-mb-lg my-card bg-secondary" style="width: 100%">
                        <q-card-section>
                            <div class="row ">
                                <div class="text-center col text-h5 text-subheadcolour">
                                    {{ condition.condition_date }}
                                </div>
                                <div class="col-4 justify-end">
                                    <q-btn label="Details" color="btn" text-color="btn" @click="condition.fixed = true" />
                                </div>
                            </div>

                        </q-card-section>
                    </q-card>
                </div>
                <!-- <q-card class="q-pa-md my-card bg-secondary" style="width: 100%">
                    <q-card-section>
                        <div class="row ">
                            <div class="text-center col text-h5 text-subheadcolour">
                                Day 5 - 12/5/2022
                            </div>
                            <div class="col-4 justify-end">
                                <q-btn label="Details" color="btn" text-color="btn" @click="fixed = true" />
                            </div>
                        </div>

                    </q-card-section>
                </q-card> -->

            </q-card-section>
        </q-card>

        <div v-for="condition in conditions" :key="condition.id">
            <q-dialog v-model="condition.fixed">
                <q-card class="bg-secondary">
                    <q-card-section>
                        <div class="text-h6 text-subheadcolour">{{condition.condition_date}}</div>
                    </q-card-section>

                    <q-separator color="grey" />

                    <q-card-section style="max-height: 50vh; width: 80vh" class="scroll">
                        <div class="text-center text-h5 text-subheadcolour">
                            <div>
                                Symptoms: {{condition.condition_symptoms}}
                            </div>
                            <div>
                                Temperature: {{condition.temperature}}
                            </div>
                            <div>
                                Oxygen level: {{condition.oxygen_lvl}}
                            </div>
                            <div>
                                Overall condition: {{condition.condition_summary}}
                            </div>

                        </div>
                        <!-- <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                        repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at
                        omnis vel numquam exercitationem aut, natus minima, porro labore.</p> -->
                    </q-card-section>

                    <q-separator />

                    <q-card-actions align="right">
                        <q-btn label="Close" color="primary" v-close-popup />
                        <!-- <q-btn flat label="Accept" color="primary" v-close-popup /> -->
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </q-page>
</template>

<script>
import { ref } from 'vue';
import { Cookies } from "quasar";

export default {
    setup() {
        return {
            fixed: ref(false)
        }
    },
    data() {
        return {
            // condition: {
            //     condition_date: "",
            //     condition_symptoms: "",
            //     temperature: "",
            //     oxygen_lvl: "",
            //     condition_summary: ""
            // },
            conditions: [],
            users: [],
        };
    },
    created() {
        this.getConditions();
    },

    methods: {
        getConditions() {
            this.$axios.get(`http://127.0.0.1:8000/api/condition/` + this.$route.params.id)
            .then(response => {
                this.conditions = response.data;
                console.log(this.conditions);
            });
        },
        async getUser() {
            try {
                const res = await this.$axios.get(
                    `http://127.0.0.1:8000/api/alluser`,
                    {
                        headers: { Authorization: "Bearer" + Cookies.get("token") },
                    }
                );
                this.users = res.data;
                // console.log(this.users);
            } catch (error) {
                console.log(error);
                if (error.response.status == 401) {
                    this.accessDenied = true;
                }
            }
        },

        visitUpdatePage(uid) {
            console.log(uid);
            this.$router.push({
                name: "condition",
                params: { id: uid },
            });
        },

        async getCondition() {
            try {
                const res = await this.$axios.get(
                    `http://127.0.0.1:8000/api/condition/` + this.$route.params.id,
                    {
                        headers: { Authorization: "Bearer" + Cookies.get("token") },
                    }
                );
                this.conditions = res.data;
                console.log(this.conditions);
                this.conditions.user_id = this.conditions[0].user_id;
                // console.log(this.posts[0].user_id);
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>