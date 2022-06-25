<template>
    <q-page class="column items-center">
        <div class="q-mb-md full-width">
            <div class="text-h4 text-center text-subheadcolour">
                My Condition Report
                <div class="text-h5 text-subheadcolour">
                    Day 5 of Quarantine
                </div>
            </div>
            <div class="column items-center q-my-md">
                <q-btn label="Update Condition" color="btn" text-color="btn" @click="$router.push('/condition')" style="width: 15%"/>
            </div>
        </div>

        <q-card class="q-px-xl q-py-md my-card bg-info" style="width: 70%">
            <q-card-section>
                <q-card class="q-pa-md q-mb-lg my-card bg-secondary" style="width: 100%">
                    <q-card-section>
                        <div class="row ">
                            <div class="text-center col text-h5 text-subheadcolour">
                                Day 5 - 12/5/2022
                            </div>
                            <!-- <div class="col"></div>
                            <div class="col"></div> -->
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
                            <!-- <div class="col"></div>
                            <div class="col"></div> -->
                            <div class="col-4 justify-end">
                                <q-btn label="Details" color="btn" text-color="btn" @click="fixed = true" />
                            </div>
                        </div>

                    </q-card-section>
                </q-card>

            </q-card-section>
        </q-card>

        <q-dialog v-model="fixed">
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
    </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        return {
            fixed: ref(false)
        }
    }
}
</script>