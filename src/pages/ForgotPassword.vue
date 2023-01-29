<template>
  <!-- <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="card card-default">
          <div class="card-header">Reset Password</div>
          <div class="card-body">
            <form autocomplete="off" @submit.prevent="requestResetPassword" method="post">
              <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email"
                  required>
              </div>
              <button type="submit" class="btn btn-primary">Send Password Reset Link</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <q-page class="flex flex-center wrapper column q-gutter-md">
    <q-card class="my-card bg-secondary" style="width: 500px">
      <q-card-section>
        <div class="q-my-md text-h4 text-center text-headingcolour">
          Reset Password
        </div>
        <div class="q-pa-md">
          <div style="width: 100%">
            <q-form  greedy class="q-gutter-md">
              <q-input bg-color="white" filled v-model="resetform.email" :label="`Email *`" lazy-rules :rules="[
                (val) =>
                  (val !== null && val !== '') || 'This field is required',
                isValidEmail,
              ]" />

              <div class="flex flex-center">
                <q-btn color="btn" text-color="btn" label="Send Password Reset Link" :loading="isLoading" type="submit"
                  style="width: 60%">
                  <template v-slot:loading> <q-spinner-facebook /> </template></q-btn>
                <!-- <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
              </div>
            </q-form>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div>
      <span id="hover" class="text-center cursor-pointer" @click="backToLogin()">
        Back to login.
      </span>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      has_error: false,
      resetform: {
        email: "",
      },
      isLoading: false,
    }
  },
  methods: {
    requestResetPassword() { //online source code
      this.$axios.post("http://127.0.0.1:8000/api/auth/reset-password", { email: this.email }).then(result => {
        this.response = result.data;
        console.log(result.data);
      }, error => {
        console.error(error);
      });
    },
    sendResetLink() {
      this.isLoading = true;
      this.$axios.post("http://127.0.0.1:8000/api/auth/reset-password", this.resetform
      ).then(result => {
        this.response = result.data;
        console.log(result.data);
      }, error => {
        console.error(error);
      });
    },
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
    backToLogin() {
      console.log();
      this.$router.push({
        name: "login"
      });
    },
  }
}
</script>