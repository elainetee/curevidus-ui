<template>
    <q-page class="column items-center">
        <div class="q-mb-md full-width">
            <div class="text-h4 text-center text-subheadcolour">
                List of Medicines
                <!-- <div class="text-h5 text-subheadcolour">
                    Day 5 of Quarantine
                </div> -->
            </div>
            <div class="column items-center q-my-md">
                <q-btn label="Add Medicine" color="btn" text-color="btn" @click="visitAddPage()" style="width: 15%" />
            </div>
        </div>

        <q-card class="q-px-xl q-py-md my-card bg-info" style="width: 70%">
            <q-card-section>
                <div v-for="medi in medicines" :key="medi.medicine_id">
                    <q-card class="q-pa-md q-mb-lg my-card bg-secondary" style="width: 100%">
                        <q-card-section>
                            <!-- <div class="grow-1 column bg-primary">
                                    <q-img
                                        :src="'http://127.0.0.1:8000/storage/uploads/' + medi.medicine_photo_name"
                                        :ratio="4/3"
                                        style="height: 140px; max-width: 150px"
                                    />
                                </div> -->
                            <div class="row items-center q-gutter-md">
                                <div v-if="medi.medicine_photo_name != null" class="col-3">
                                    <q-img
                                        :src="'http://127.0.0.1:8000/storage/uploads/' + medi.medicine_photo_name"
                                        :ratio="4/3"
                                        style="height: 190px; max-width: 200px"
                                    />
                                </div>
                                <div v-if="medi.medicine_photo_name == null" class="col-3">
                                    <q-img
                                        :src="'https://img.kpopmap.com/wp-content/uploads_kpopmap/2017/09/chanyeol-min-1.jpg'"
                                        :ratio="4/3"
                                        style="height: 190px; max-width: 200px"
                                    />
                                </div>
                                <!-- <div class="grow-3 text-left col-6 text-h4 text-subheadcolour"> -->
                                <div class="grow-3 text-left col text-h4 text-subheadcolour">
                                    <div>
                                        {{ medi.medicine_name }}
                                    </div>
                                    <div class="text-h6">
                                        {{ medi.medicine_desc }}
                                    </div>
                                    <div class="text-h5">
                                        RM{{ medi.medicine_price }}
                                    </div>

                                </div>
                                <!-- <div v-if="roleid == '1'" class="col-2">
                                    <div class="column">
                                    
                                        <q-btn label="Add to cart" color="btn-grey"  text-color="btn"/>
                                    </div>
                                </div> -->
                                <div class="col-2">
                                    <div class="column">
                                    
                                    <q-btn label="Edit" color="btn-grey" @click="visitEditPage(medi.medicine_id)" text-color="btn"/>
                                        <!-- @click="visitEditPage(medi.medicine_id)" /> -->
                                    <div class="q-pa-sm"></div>
                                    <q-btn label="Delete" color="red-10" @click="medi.confirm = true"/>
                                </div>
                                <q-dialog v-model="medi.confirm" persistent>
                                  <q-card>
                                    <q-card-section class="row items-center">
                                      <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
                                      <span class="q-ml-sm">Are you sure you want to delete this medicine?</span>
                                    </q-card-section>

                                    <q-card-actions align="right">
                                      <q-btn flat label="No" color="primary" v-close-popup />
                                      <q-btn flat label="Yes, delete" color="primary" @click="deleteMedicine(medi.medicine_id)" />
                                    </q-card-actions>
                                  </q-card>
                                </q-dialog>
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

        

        <!-- <div v-for="condition in conditions" :key="condition.id"> -->
        <!-- <q-dialog v-model="fixed">
            <q-card class="bg-secondary">
                <q-card-section>
                    <div class="text-h6 text-subheadcolour">Day 5 - 12/5/2022</div>
                </q-card-section>

                <q-separator color="grey" />

                <q-card-section style="max-height: 50vh; width: 80vh" class="scroll">
                    <div class="text-center text-h5 text-subheadcolour">
                        <div>
                            Symptoms:
                        </div>
                        <div>
                            Temperature:
                        </div>
                        <div>
                            Oxygen level:
                        </div>
                        <div>
                            Overall condition:
                        </div>

                    </div> -->
                    <!-- <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                        repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at
                        omnis vel numquam exercitationem aut, natus minima, porro labore.</p> -->
                <!-- </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn label="Close" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog> -->
        <!-- </div> -->
    </q-page>
</template>

<script>
import { ref } from 'vue';
import { Cookies } from "quasar";
// import { userdetails } from '../components/userId.js';

export default {
    setup() {
        return {
            confirm: ref(false),
        }
    },
    data() {
        return {
            medicines: [],
            // user:[],
            // user: ref(userdetails.user),
            // userdetails
            roleid: ""
            
            
        }
    },
    // async mounted(){
    //     let user = await this.$auth.getUserid();
    //     // console.log(this.users);
    // },
    created() {
        this.getMedicines();
        // this.getUserid();
        // this.roleid = this.$route.query.roleid
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
        getMedicines() {
            this.$axios.get("http://127.0.0.1:8000/api/medicine").then(response => {
                this.medicines = response.data;
                console.log(this.medicines);
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
    // async getUserid() {
    //   try {
    //     //  Axios.defaults.headers.common['Authorization'] = 'Bearer' + Cookies.get('token')
    //     const res = await this.$axios.get(`http://127.0.0.1:8000/api/user`, {
    //       headers: { Authorization: "Bearer" + Cookies.get("token") },
    //       contentType: "text/plain",
    //     });
    //     this.user = res.data;
    //     console.log(this.user.role_id)
    //     // this.user.role_id = this.users.role_id;
    //     console.log(this.user);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
}
    // setup() {
    //     return {
    //         fixed: ref(false)
    //     }
    // },
    // data() {
    //     return {
    //         condition: {
    //             condition_date: "",
    //             symptoms: "",
    //             temperature: "",
    //             oxygenlvl: "",
    //             summary: ""
    //         },
    //         conditions: [],
    //         users: [],
    //     };
    // },

    // methods: {
    //     async getUser() {
    //         try {
    //             const res = await this.$axios.get(
    //                 `http://127.0.0.1:8000/api/alluser`,
    //                 {
    //                     headers: { Authorization: "Bearer" + Cookies.get("token") },
    //                 }
    //             );
    //             this.users = res.data;
    //             // console.log(this.users);
    //         } catch (error) {
    //             console.log(error);
    //             if (error.response.status == 401) {
    //                 this.accessDenied = true;
    //             }
    //         }
    //     },

    //     visitUpdatePage(uid) {
    //         console.log(uid);
    //         this.$router.push({
    //             name: "condition",
    //             params: { id: uid },
    //         });
    //     },

    //     async getCondition() {
    //         try {
    //             const res = await this.$axios.get(
    //                 `http://127.0.0.1:8000/api/condition/` + this.$route.params.id,
    //                 {
    //                     headers: { Authorization: "Bearer" + Cookies.get("token") },
    //                 }
    //             );
    //             this.conditions = res.data;
    //             console.log(this.conditions);
    //             this.conditions.user_id = this.conditions[0].user_id;
    //             // console.log(this.posts[0].user_id);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     },
    // }

</script>