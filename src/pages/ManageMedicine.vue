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
        <!-- <div v-if="this.$route.params.id == null"> -->

        <q-card class="q-px-xl q-py-md my-card bg-secondary" style="width: 50%">
            <!-- <div v-for="medi in medicines" :key="medi.medicine_name"> -->
            <q-card-section>

                <q-form class="q-gutter-md q-pt-md" enctype="multipart/form-data">
                    <q-input filled bg-color="white" v-model="medicine.medicine_name" label="Medicine Name *" lazy-rules
                        :rules="[
                            val => val && val.length > 0 || 'Please key in medicine name'
                        ]">
                        <!-- <template v-if="medi.medicine_name" v-slot:append></template> -->
                    </q-input>

                    <q-input filled bg-color="white" type="textarea" v-model="medicine.medicine_desc"
                        label="Medicine description *" lazy-rules :rules="[
                            val => val && val.length > 0 || 'Please key in medicine description'
                        ]" />

                    <q-input filled bg-color="white" v-model="medicine.medicine_price" label="Price (RM) *" lazy-rules
                        :rules="[
                            val => val.length > 0 || 'Please key in the price for medicine',
                            val => val > 0 || 'Please key in a valid price'
                        ]" />
                    
                    <div v-if="medicine.medicine_photo_name != null" class="">
                        <div class="text-h6 text-subheadcolour q-pb-xs">
                            Medicine photo uploaded:
                        </div>
                        <div class="row items-center">
                            
                        <div class="col-8">
                        <q-img
                            :src="'http://127.0.0.1:8000/storage/uploads/' + medicine.medicine_photo_name"
                            :ratio="4/3"
                            style="height: 340px; max-width: 350px"
                        />
                        </div>
                        <div class="col-4 items-left bg-secondary">
                            <div class="column items-left">
                                <q-btn label="Remove Photo" color="red-10" @click="confirm = true"/>
                            </div>
                            
                        </div>
                    
                    </div>
                    </div>
                    <div v-if="medicine.medicine_photo_name == null" class="">
                        <div class="text-h7 text-subheadcolour q-pb-xs">
                            Hint: You have not upload any photo for this medicine yet.
                        </div>
                            <!-- <q-img
                                :src="'https://img.kpopmap.com/wp-content/uploads_kpopmap/2017/09/chanyeol-min-1.jpg'"
                                :ratio="4/3"
                                style="height: 340px; max-width: 350px"
                            /> -->
                    </div>
                    <!-- <div class="">                        
                        <div class="text-h6 text-subheadcolour">
                            Upload a new medicine photo here:
                        </div>
                        (The uploaded photo will replace the original photo)
                    </div> -->
                    <q-file filled bottom-slots v-model="medicine.file" label="Upload your medicine photo here" counter
                    v-on:change="onChange">
                        <template v-slot:prepend>
                          <q-icon name="cloud_upload" @click.stop.prevent />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click.stop.prevent="medicine.file = null" class="cursor-pointer" />
                        </template>

                        <template v-slot:hint>
                            The uploaded photo will replace the original photo
                        </template>
                    </q-file>
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
                        <q-btn v-if="this.$route.params.id == null" @click="addMedicine()" label="Create" color="primary" />
                        <q-btn v-if="this.$route.params.id != null" @click="editMedicine()" label="Update" color="primary" />
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

        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
              <span class="q-ml-sm">Are you sure you want to delete this medicine photo?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="No" color="primary" v-close-popup />
              <q-btn flat label="Yes, delete" color="primary" @click="removeMedPhoto(this.$route.params.id)" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- </div> -->
    </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
    setup() {
        return {
            confirm: ref(false),
        }
    },
    data() {
        // if (this.$route.params.id != null) {
        //     this.getMedicines(this.$route.params.id);
        // }
        // else {
            
        return {
            medicine: {
                // medicine_id: "",
                medicine_name: "",
                medicine_desc: "",
                medicine_price: "",
                medicine_photo_name: "",
                file: null,
                // oxygen_lvl: "",
                // condition_summary: ""
            },
            medicines: [],
            // users: [],
        };
        // }
    },
    created() {
        this.getCurMedicine();
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
        getCurMedicine() {
            this.$axios.get("http://127.0.0.1:8000/api/medicine/" + this.$route.params.id).then(response => {
                this.medicines = response.data;
                // this.medicine.medicine_id = this.medicines.medicine_id;
                this.medicine.medicine_name = this.medicines.medicine_name;
                this.medicine.medicine_desc = this.medicines.medicine_desc;
                this.medicine.medicine_price = this.medicines.medicine_price;
                this.medicine.medicine_photo_name = this.medicines.medicine_photo_name;
                // this.medicine.file = this.medicines.file;
                console.log(this.medicines);
                console.log(this.medicine.medicine_name);
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
        async removeMedPhoto(id) {
            try {
                const res = await this.$axios.patch(
                    `http://127.0.0.1:8000/api/medicine/updatePhoto/` + id
                );
                this.medicines = res.data;
                this.getMedicines();
                this.$q.notify("Medicine photo deleted successfully");
                this.$router.push({
                    name: "medicine"
                });
            } catch (error) {
                console.log(error);
            }
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
        async editMedicine() {
            // const config = {
            //     headers: {
            //         'content-type': 'multipart/form-data'
            //     }
            // }
            // try {
            // let newMedicine = {
            //     medicine_name: this.medicine.medicine_name,
            //     medicine_desc: this.medicine.medicine_desc,
            //     medicine_price: this.medicine.medicine_price,
            //     file: this.medicine.file
            // };
            let newMedicine = new FormData();
            newMedicine.append('_method', 'PATCH')
            newMedicine.append('medicine_name', this.medicine.medicine_name);
            newMedicine.append('medicine_desc', this.medicine.medicine_desc);
            newMedicine.append('medicine_price', this.medicine.medicine_price);
            newMedicine.append('file', this.medicine.file);
            // this.conditions.unshift(newCondition);
            await this.$axios.post(
                `http://127.0.0.1:8000/api/medicine/update/` + this.$route.params.id, newMedicine
                // { headers: { Authorization: "Bearer" + Cookies.get("token") } }
            ).then(function (response) {
                console.log(response);
                console.log(this.medicine);
            })
                .catch(function (error) {
                    console.log(error);
                });
            // this.post = res.data;
            this.$q.notify("Medicine updated successfully");
            // } catch (error) {
            //     console.log(error);
            // }
            this.$router.push({
                name: "medicine"
            });
            
        },
        onChange(e) {
                this.medicine.file = e.target.files[0];
        },
        async addMedicine() {
            // try {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            // let newMedicine = {
            //     medicine_name: this.medicine.medicine_name,
            //     medicine_desc: this.medicine.medicine_desc,
            //     medicine_price: this.medicine.medicine_price,
            //     file: this.medicine.file,
            // };
            let newMedicine = new FormData();
            newMedicine.append('medicine_name', this.medicine.medicine_name);
            newMedicine.append('medicine_desc', this.medicine.medicine_desc);
            newMedicine.append('medicine_price', this.medicine.medicine_price);
            newMedicine.append('file', this.medicine.file);
            // this.conditions.unshift(newCondition);
            await this.$axios.post(
                `http://127.0.0.1:8000/api/medicine/store/`,
                newMedicine, config
                // { headers: { Authorization: "Bearer" + Cookies.get("token") } }
            ).then(function (response) {
                console.log(response);
                console.log(this.medicine);
                
            })
                .catch(function (error) {
                    console.log(error);
                });
            // this.post = res.data;
            this.$q.notify("Medicine created successfully");
            // } catch (error) {
            //     console.log(error);
            // }
            this.$router.push({
                name: "medicine"
            });
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