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
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">

                    <!-- <div class="column">
                        <q-checkbox v-model="right" label="Fever" />
                        <q-checkbox v-model="right" label="Sore throat" />
                        <q-checkbox v-model="right" label="Loss of taste or smell" />
                        <q-checkbox v-model="right" label="Cough" />
                    </div> -->
                    <div class="bg-white q-pa-md rounded-borders">
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

                    </div>
                    <q-input 
                    filled 
                    bg-color="white"
                    v-model="temp" 
                    label="Temperature (°C) *" 
                    lazy-rules
                        :rules="[
                            val => val && val.length > 0 || 'Please key in your temperature',
                            val => val > 25 && val <= 41 || 'Please key in a valid temperature'
                            ]" />

                    <q-input 
                    filled 
                    bg-color="white"
                    v-model="oxy" 
                    label="Oxygen Level (%)" 
                    lazy-rules :rules="[
                        val => val > 0 && val <= 100 || 'Oxygen Level must be between 1-100'
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
    setup() {
        const $q = useQuasar()
        const othersymp = ref(null)
        const temp = ref(null)
        const oxy = ref(null)
        const submitResult = ref([])


        return {
            othersymp,
            temp,
            oxy,
            right: ref(false),
            preferred: ref('rock'),
            accepted: ref([]),
            submitResult,
            options: [
              {
                label: 'Fever',
                value: 'fever'
              },
              {
                label: 'Sore throat',
                value: 'sore throat'
              },
              {
                label: 'Loss of taste or smell',
                value: 'loss of taste or smell'
              },
              {
                label: 'Cough',
                value: 'cough'
              }
            ],

            onSubmit() {
                // if (accept.value !== true) {
                //     $q.notify({
                //         color: 'red-5',
                //         textColor: 'white',
                //         icon: 'warning',
                //         message: 'You need to accept the license and terms first'
                //     })
                // }
                // else {
                    $q.notify({
                        color: 'green-4',
                        textColor: 'white',
                        icon: 'cloud_done',
                        message: 'Submitted'
                    })
                // }
            },

            onReset() {
                temp.value = null
                oxy.value = null
            }
        }
    }
}
</script>