<template>
    <q-page class="column items-center">
        <div class="q-mb-md full-width">
            <div class="text-h4 text-center text-subheadcolour">
                Manage Medicines
                <!-- <div class="text-h5 text-subheadcolour">
                    Day 5 of Quarantine
                </div> -->
            </div>
            <!-- <div class="column items-center q-my-md">
                <q-btn label="Update Condition" color="btn" text-color="btn" @click="$router.push('/condition')" style="width: 15%"/>
            </div> -->
        </div>
        <!-- <div v-if="this.$route.params.id != null"> -->
        
            <q-card class="q-px-xl q-py-md my-card bg-secondary" style="width: 50%">
            <!-- <div v-for="medi in medicines" :key="medi.medicine_name"> -->
                <q-card-section>
                    
                    <q-form @submit="addMedicine()" class="q-gutter-md q-pt-md">
                        <q-input filled bg-color="white" v-model="medicine.medicine_name" label="Medicine Name *"
                            lazy-rules :rules="[
                                val => val && val.length > 0 || 'Please key in medicine name'
                            ]">
                            <!-- <template v-if="medi.medicine_name" v-slot:append></template> -->
                        </q-input>

                        <q-input filled bg-color="white" type="textarea" v-model="medicine.medicine_desc"
                            label="Medicine description *" lazy-rules :rules="[
                                val => val && val.length > 0 || 'Please key in medicine description'
                            ]" />

                        <q-input filled bg-color="white" v-model="medicine.medicine_price" label="Price (RM) *"
                            lazy-rules :rules="[
                                val => val && val.length > 0 || 'Please key in the price for medicine',
                                val => val > 0 || 'Please key in a valid price'
                            ]" />

                        <!-- <q-input filled bg-color="white" v-model="medicine.oxygen_lvl" label="Oxygen Level (%)" lazy-rules
                        :rules="[
                            val => val > 0 && val <= 100 || 'Oxygen Level must be between 1-100'
                        ]" />

                    <q-input filled bg-color="white" v-model="medicine.condition_summary"
                        label="Overall condition (no/mild/severe symptoms) *" lazy-rules :rules="[
                            val => val && val.length > 0 || 'Please key in your overall condition'
                        ]" /> -->


                        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

                        <div>
                            <q-btn label="Create" type="submit" color="primary" />
                            <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
                        </div>
                    </q-form>
                    <!-- <q-card class="q-pa-md q-mb-lg my-card bg-secondary" style="width: 100%">
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
                </q-card>
                <q-card class="q-pa-md my-card bg-secondary" style="width: 100%">
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
                    <!-- </div> -->

            </q-card>
        
        <!-- </div> -->
    </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
    data() {
        // if (this.$route.params.id != null) {
        //     this.getMedicines(this.$route.params.id);
        // }
        // else {
        return {
            medicine: {
                medicine_name: "",
                medicine_desc: "",
                medicine_price: "",
                // oxygen_lvl: "",
                // condition_summary: ""
            },
            medicines: [],
            // users: [],
        };
        // }
    },
    created() {

        if (this.$route.params.id != null) {
            this.getMedicines(this.$route.params.id);
            // return {
            //     medicine: {
            //         medicine_name: this.medicines.medicine_name,
            //         medicine_desc: this.medicines.medicine_desc,
            //         medicine_price: this.medicines.medicine_price,
            //         // oxygen_lvl: "",
            //         // condition_summary: ""
            //     },
            // }
        }
    },
    methods: {
        getMedicines() {
            this.$axios.get("http://127.0.0.1:8000/api/medicine/").then(response => {
                this.medicines = response.data;
                // this.medicine_name = this.medicines.medicine_name;
                // this.medicine_desc = this.medicines.medicine_desc;
                // this.medicine_price = this.medicines.medicine_price;
                console.log(this.medicines);
                // return {
                //     medicine: {
                //         medicine_name: this.medicines.medicine_name,
                //         medicine_desc: this.medicines.medicine_desc,
                //         medicine_price: this.medicines.medicine_price,
                //         // oxygen_lvl: "",
                //         // condition_summary: ""
                //     },
                //     medicines: this.medicines,
                // users: [],
                // };
                // console.log(this.medicine_name);
            });
        },
        // addCond2() { //working but not using
        //     this.$axios.post(
        //         `http://127.0.0.1:8000/api/condition/create/` + this.$route.params.id,
        //         {
        //             condition_date: this.medicine.medicine_name,
        //             condition_symptoms: this.medicine.medicine_desc,
        //             temperature: this.medicine.medicine_price,
        //             oxygen_lvl: this.medicine.oxygen_lvl,
        //             condition_summary: this.medicine.condition_summary
        //         })
        //         .then(function (response) {
        //             console.log(response);
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });
        // },
        // addCond() {
        //     try {
        //         let newCondition = {
        //             condition_date: this.condition.condition_date,
        //             condition_symptoms: this.condition.condition_symptoms,
        //             temperature: this.condition.temperature,
        //             oxygen_lvl: this.condition.oxygen_lvl,
        //             condition_summary: this.condition.condition_summary
        //         };
        //         this.conditions.unshift(newCondition);
        //         const res = this.$axios.post(
        //             `http://127.0.0.1:8000/api/condition/create/` + this.$route.params.id,
        //             newCondition
        //         );
        //         this.condition = res.data;
        //         this.$q.notify("Posted successfully");
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
        addMedicine() {
            // try {
            let newMedicine = {
                medicine_name: this.medicine.medicine_name,
                medicine_desc: this.medicine.medicine_desc,
                medicine_price: this.medicine.medicine_price,
            };
            // this.conditions.unshift(newCondition);
            this.$axios.post(
                `http://127.0.0.1:8000/api/medicine/store/`,
                newMedicine
                // { headers: { Authorization: "Bearer" + Cookies.get("token") } }
            ).then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });
            // this.post = res.data;
            this.$q.notify("Medicine created successfully");
            // } catch (error) {
            //     console.log(error);
            // }
        }
    }
}
    // setup() {
    //     const $q = useQuasar()
    //     const othersymp = ref(null)
    //     const symp = ref(null)
    //     const temp = ref(null)
    //     const oxy = ref(null)
    //     const summary = ref(null)
    //     const submitResult = ref([])


    //     return {
    //         othersymp,
    //         symp,
    //         temp,
    //         oxy,
    //         summary,
    //         right: ref(false),
    //         preferred: ref('rock'),
    //         accepted: ref([]),
    //         submitResult,
    //         options: [
    //             {
    //                 label: 'Fever',
    //                 value: 'fever'
    //             },
    //             {
    //                 label: 'Sore throat',
    //                 value: 'sore throat'
    //             },
    //             {
    //                 label: 'Loss of taste or smell',
    //                 value: 'loss of taste or smell'
    //             },
    //             {
    //                 label: 'Cough',
    //                 value: 'cough'
    //             }
    //         ],

    //         onSubmit() {
    //             // if (accept.value !== true) {
    //             //     $q.notify({
    //             //         color: 'red-5',
    //             //         textColor: 'white',
    //             //         icon: 'warning',
    //             //         message: 'You need to accept the license and terms first'
    //             //     })
    //             // }
    //             // else {
    //             $q.notify({
    //                 color: 'green-4',
    //                 textColor: 'white',
    //                 icon: 'cloud_done',
    //                 message: 'Submitted'
    //             })
    //             // }
    //         },

    //         onReset() {
    //             temp.value = null
    //             oxy.value = null
    //         }
    //     }
    // }

</script>