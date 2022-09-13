<template>
  <q-page class="flex flex-center wrapper">
    <q-card class="my-card bg-secondary" style="width: 500px">
      <q-card-section>
        <div class="q-my-md text-h4 text-center text-headingcolour">
          Welcome back
        </div>
        <div class="q-pa-md">
          <div style="width: 100%">
            <q-form @submit="onSubmit()" greedy class="q-gutter-md">
              <q-input
                bg-color="white"
                filled
                v-model="form.email"
                :label="`Email *`"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'This field is required',
                  isValidEmail,
                ]"
              />

              <q-input
                bg-color="white"
                filled
                type="password"
                v-model="form.password"
                :label="`Password *`"
              />

              <div
                id="hover"
                class="text-right text-caption cursor-pointer"
                @click="$router.push('/forgot-password')"
              >
                Forgot password?
              </div>
              <div v-if="isError" class="row justify-center" style="color: red">
                {{ errorMsg }}
              </div>
              <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

              <div class="flex flex-center">
                <q-btn
                  color="btn"
                  text-color="btn"
                  label="Login"
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
    <div
      id="hover"
      class="flex flex-center text-center cursor-pointer"
      @click="visitSignUpPage()"
    >
      Click here to sign up
    </div>
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

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
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
          `http://127.0.0.1:8000/api/login`,
          this.form,
          {}
        );
        this.data = res.data;
        const config = { path: "/", sameSite: "strict" };
        Cookies.set("token", res.data.token, config);
        this.$router.push("/homepage");
      } catch (e) {
        this.isLoading = false;
        this.isError = true;
        this.errorMsg = e.response.data.error;
      }
    },
    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Invalid email";
    },
    inSubmit() {
      console.log("Hello");
    },

    visitSignUpPage() {
            console.log();
            this.$router.push({
                name: "register"
            });
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

.wrapper {
  gap: 10px;
  flex-direction: column;
}

#login {
  white-space: nowrap;
}
#spinner {
  display: inline-block;
  margin-top: 20px;
}
</style>
