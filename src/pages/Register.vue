<template>
    <q-page class="flex flex-center">
      <q-card class="my-card bg-secondary" style="width: 700px">
        <q-card-section>
          <div class="q-my-md text-h4 text-center text-headingcolour">
            Register Account
          </div>
          <div class="q-pa-lg">
            <div style="width: 100%">
              <q-form @submit="onSubmit()" greedy class="q-gutter-md">
                <InputField
                    v-model="form.name"
                    labelling="Name *"
                />

                <InputField
                  v-model="form.email"
                  labelling="Email *"
                  lazy-rules
                  :rules="[
                    (val) => (val !== null && val !== '') || 'This field is required',
                    isValidEmail, 
                  ]"
                />

                <InputField
                    v-model="form.password"
                    type="password"
                    labelling="Password *"
                />

                <InputField
                    v-model="cpassword"
                    type="password"
                    labelling="Confirm Password *"
                    lazy-rules
                    :rules="[
                      (val) =>
                      (val == form.password ) || 'Password does not match',
                    ]"
                />

                <InputField
                    v-model="form.tel_no"
                    type="tel"
                    labelling="Phone Number *"
                    lazy-rules
                    :rules="[
                      (val) =>
                      (val.length == 10 || val.length == 11) || 'Please key in a valid phone number',
                    ]"
                />

                <q-card flat class="q-pa-sm">
                    <div class="text-primary text-h6 q-px-sm">
                        Choose Your Role:
                    </div>
                <q-radio name="role" v-model="form.role_id" val="1" label="Covid-19 Patient" />
                <q-radio name="role" v-model="form.role_id" val="2" label="Family/Friends" />
                </q-card>
                <!-- <InputField
                    v-model="form.vacStat"
                    labelling="Vaccination Status"
                /> -->
  
                <!-- <div
                  id="hover"
                  class="text-right text-caption cursor-pointer"
                  @click="$router.push('/forgot-password')"
                >
                  Forgot password?
                </div> -->
                <div v-if="isError" class="row justify-center" style="color: red">
                  {{ errorMsg }}
                </div>
                <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
  
                <div class="flex flex-center">
                  <q-btn
                    color="btn"
                    text-color="btn"
                    label="Register"
                    :loading="isLoading"
                    type="submit"
                    ><template v-slot:loading> <q-spinner-facebook /> </template
                  ></q-btn>
                  <!-- <q-btn label="Submit" type="submit" color="primary"/>
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
                </div>
              </q-form>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  // import { defineComponent } from 'vue';
  
  // export default defineComponent({
  //   name: 'PageIndex'
  // })
  
  import { Cookies } from "quasar";
  import { useQuasar } from "quasar";
  import { ref } from "vue";

import InputField from "../components/InputField.vue";
  
  export default {
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                tel_no: "",
                role_id: 0,
                // vacStat: "",
            },
            cpassword: "",
            isLoading: false,
            isError: false,
            errorMsg: "",
        };
    },
    methods: {
        async onSubmit() {
            this.isLoading = true;
            // call api to submit
            try {
                const res = await this.$axios.post(
                // `${process.env.API}/api/login`,
                `http://127.0.0.1:8000/api/register`, this.form, {});
                this.data = res.data;
                // const config = { path: "/", sameSite: "strict" };
                // Cookies.set("token", res.data.token, config);
                console.log(this.form);
                this.$router.push("/");
            }
            catch (e) {
                this.isLoading = false;
                this.isError = true;
                this.errorMsg = e.response.data.error;
            }
        },
        isValidEmail(val) {
            const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
            return emailPattern.test(val) || "Invalid email";
        },
        inSubmit() {
            console.log("Hello");
        },
        // setup() {
        //   const $q = useQuasar()
        //   const email = ref(null)
        //   const password = ref(null)
        //   const accept = ref(false)
        //   return {
        //     email,
        //     password,
        //     accept,
        //     onSubmit() {
        //       if (accept.value !== true) {
        //         $q.notify({
        //           color: 'red-5',
        //           textColor: 'white',
        //           icon: 'warning',
        //           message: 'You need to accept the license and terms first'
        //         })
        //       }
        //       else {
        //         $q.notify({
        //           color: 'green-4',
        //           textColor: 'white',
        //           icon: 'cloud_done',
        //           message: 'Submitted'
        //         })
        //       }
        //     }
        //   }
        // }
    },
    components: { InputField, InputField, InputField, InputField }
};
  </script>
  
  <style>
  #hover:hover {
    text-decoration: underline;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  
  #login {
    white-space: nowrap;
  }
  #spinner {
    display: inline-block;
    margin-top: 20px;
  }
  </style>
  