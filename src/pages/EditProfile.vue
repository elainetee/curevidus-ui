<template>
  <q-page padding>
    <div>
      <h3 class="text-h5">Update Profile</h3>
      <div class="form">
        <q-form @submit="onSubmitUser()" greedy>
          <div class="q-gutter-md">
            <q-input
              class="q-mt-md q-mr-sm"
              v-model="user.name"
              filled
              label="Name"
              :rules="[(v) => v !== '' || 'This field is required']"
            ></q-input>
            <q-input
              class="q-mt-md q-mr-sm"
              v-model="user.email"
              filled
              :rules="[
                (v) => v !== '' || 'This field is required',
                isValidEmail,
              ]"
              label="Email"
            ></q-input>
            <q-input
              class="q-mt-md q-mr-sm"
              v-model="user.tel_no"
              filled
              :rules="[
                (v) => v !== '' || 'This field is required',
                isValidNumber,
              ]"
              label="Telephone no."
            ></q-input>
          </div>
          <div class="row justify-center">
            <q-btn
              style="background: white"
              class="q-ma-lg"
              type="submit"
              label="update"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import { Cookies } from "quasar";

export default {
  data() {
    return {
      user: [],
    };
  },
  methods: {
    //test
    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Invalid email";
    },

    isValidNumber(val) {
      const numPattern = /^[0-9]+$/;
      return numPattern.test(val) || "Please input number only";
    },

    async onSubmitUser() {
      // call api to submit
      try {
        const res = await this.$axios.patch(
          `http://127.0.0.1:8000/api/user/updateprofile/` + this.user.id,
          this.user,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.data = res.data;
        alert("User info updated");
        this.$router.go(-1);
      } catch (e) {
        console.log(e);
      }
    },
    // async getStaffData() {
    //   try {
    //     const res = await this.$axios.get(
    //       `${process.env.API}/api/admin/user/` + this.$route.params.id,
    //       {
    //         headers: { Authorization: "Bearer" + Cookies.get("token") },
    //       }
    //     );
    //     this.user = res.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getUser() {
      try {
        const res = await this.$axios.get(`http://127.0.0.1:8000/api/alluser`, {
          headers: { Authorization: "Bearer" + Cookies.get("token") },
        });
        this.users = res.data;
        this.user = this.users.find((obj) => obj.id == this.$route.params.id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    // this.getStaffData();
    this.getUser();
  },
};
</script>

<style>
h3 {
  text-align: center;
}
form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
