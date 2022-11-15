<template>
    <q-page class="column items-center">
        <div class="q-mb-md full-width">
            <div class="text-h4 text-center text-subheadcolour">
                Update My Condition
                <!-- <div class="text-h5 text-subheadcolour">
                    Day 5 of Quarantine
                </div> -->
            </div>
            <!-- <div class="column items-center q-my-md">
                <q-btn label="Update Condition" color="btn" text-color="btn" @click="$router.push('/condition')" style="width: 15%"/>
            </div> -->
        </div>

        <q-card class="q-px-xl q-py-md my-card bg-secondary" style="width: 50%">
            <q-card-section>
                <q-form @submit="submitCondition()" class="q-gutter-md q-pt-md">

                    <!-- <div class="column">
                        <q-checkbox v-model="right" label="Fever" />
                        <q-checkbox v-model="right" label="Sore throat" />
                        <q-checkbox v-model="right" label="Loss of taste or smell" />
                        <q-checkbox v-model="right" label="Cough" />
                    </div> -->
                    <!-- <div class="bg-white q-pa-md rounded-borders">
                        Symptoms *:
                        <q-option-group
                          name="symptoms"
                          v-model="accepted"
                          :options="options"
                          type="checkbox"
                          color="primary"
                          inline
                          />
                    
                    <q-input 
                    class="q-mt-sm"
                    filled 
                    bg-color="grey-3"
                    v-model="othersymp" 
                    label="Other symptoms (If any)" 
                    />

                    </div> -->
                    <div class="q-pa-md">
                        <div class="q-gutter-md row items-start">
                            <!-- <q-date v-model="condition.condition_date" /> -->

                            <q-date v-model="condition.condition_date" minimal />
                        </div>
                    </div>

                    <!-- <q-input filled bg-color="white" v-model="condition.condition_date" label="Date (yyyy-MM-dd) *"
                        lazy-rules :rules="[
                            val => val && val.length > 0 || 'Please key in today\'s date'
                        ]" /> -->

                    <q-input filled bg-color="white" v-model="condition.condition_symptoms" label="Symptoms *"
                        lazy-rules :rules="[
                            val => val && val.length > 0 || 'Please key in your symptoms'
                        ]" />

                    <q-input filled bg-color="white" v-model="condition.temperature" label="Temperature (°C) *"
                        lazy-rules :rules="[
                            val => val && val.length > 0 || 'Please key in your temperature',
                            val => val > 25 && val <= 41 || 'Please key in a valid temperature'
                        ]" />

                    <q-input filled bg-color="white" v-model="condition.oxygen_lvl" label="Oxygen Level (%)" lazy-rules
                        :rules="[
                            val => val > 0 && val <= 100 || 'Oxygen Level must be between 1-100'
                        ]" />

                    <q-input filled bg-color="white" v-model="condition.condition_summary"
                        label="Overall condition (no/mild/severe symptoms) *" lazy-rules :rules="[
                            val => val && val.length > 0 || 'Please key in your overall condition'
                        ]" />


                    <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

                    <div>
                        <q-btn label="Submit" type="submit" color="primary" />
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
        </q-card>
    </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
    data() {
        return {
            condition: {
                condition_date: "",
                condition_symptoms: "",
                temperature: "",
                oxygen_lvl: "",
                condition_summary: ""
            },
            conditions: [],
            users: [],
        };
    },
    created() {
        this.currentDate();
    },
    methods: {
        currentDate() {
            const current = new Date();
            const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;
            // return date;
            this.condition.condition_date = date;
        },
        addCond2() {
            this.$axios.post(
                `http://127.0.0.1:8000/api/condition/create/` + this.$route.params.id,
                {
                    condition_date: this.condition.condition_date,
                    condition_symptoms: this.condition.condition_symptoms,
                    temperature: this.condition.temperature,
                    oxygen_lvl: this.condition.oxygen_lvl,
                    condition_summary: this.condition.condition_summary
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
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
        submitCondition() {
            // try {
            let newCondition = {
                condition_date: this.condition.condition_date,
                condition_symptoms: this.condition.condition_symptoms,
                temperature: this.condition.temperature,
                oxygen_lvl: this.condition.oxygen_lvl,
                condition_summary: this.condition.condition_summary
            };
            // this.conditions.unshift(newCondition);
            this.$axios.post(
                `http://127.0.0.1:8000/api/condition/create/` + this.$route.params.id,
                newCondition
                // { headers: { Authorization: "Bearer" + Cookies.get("token") } }
            ).then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });
            // this.post = res.data;
            this.$q.notify("Condition added successfully");
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