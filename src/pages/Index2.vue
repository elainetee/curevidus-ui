<template>
  <q-page class="bg-lime-1 column justify-center items-center">
    <h3 class="text-h5 q-my-md">Welcome back</h3>
    <q-form @submit="onSubmit()" greedy>
      <div class="q-gutter-md">
        <q-card square bordered class="q-pa-xl shadow-1">
          <q-input
            v-model="form.email"
            filled
            :label="`Email `"
            :rules="[(v) => v !== '' || 'This field is required', isValidEmail]"
          ></q-input>
          <q-input
            v-model="form.password"
            filled
            :label="`Password `"
            type="password"
          ></q-input>
          <div 
          id="hover"
          class="text-right text-caption cursor-pointer" 
          @click="$router.push('/forgot-password')">
            Forgot password?
          </div>
        </q-card>
      </div>
      <div v-if="isError" class="row justify-center" style="color: red">
        {{ errorMsg }}
      </div>
      <div id="login" class="row justify-center">
        <q-btn
          class="q-ma-md"
          style="background: white"
          type="submit"
          :loading="isLoading"
          label="Login"
          @click="onSubmit()"
        >
          <template v-slot:loading>
            <q-spinner-facebook /> </template
        ></q-btn>
        <!-- <q-spinner-oval
          id="spinner"
          v-if="isLoading"
          color="primary"
          size="2em"
        /> -->
      </div>
    </q-form>
    <div>
      Click
      <span
        class="text-primary cursor-pointer"
        style="text-decoration: underline"
        @click="$router.push('/signup')"
        >here</span
      >
      to sign up
    </div>
  </q-page>
</template>

<script>
import { Cookies } from "quasar";
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
          `${process.env.API}/api/login`,
          this.form,
          {}
        );
        this.data = res.data;
        const config = { path: "/", sameSite: "strict" };
        Cookies.set("token", res.data.token, config);
        this.$router.push("/mainpage");
      } catch (e) {
        this.isLoading = false;
        this.isError = true;
        this.errorMsg = e.response.data.error;
      }
    },
    // async withToken() {
    //   try {
    //     const res = await this.$api.get(`api/user/profile`);
    //     this.data = res.data;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },

    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Invalid email";
    },
  },
};
</script>
<style>
#hover:hover{
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
