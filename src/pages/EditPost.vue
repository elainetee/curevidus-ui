<template>
  <q-page padding>
    <div>
      <h3 class="text-h5">Edit Post</h3>
      <div class="form">
        <q-form @submit="onSubmitPost()" greedy>
          <div class="q-gutter-md">
            <q-input
              class="q-mt-md q-mr-sm"
              v-model="posts.content"
              filled
              label="Post"
              :rules="[(v) => v !== '' || 'This field is required']"
            ></q-input>
          </div>
          <div class="row justify-center">
                        <q-btn
              style="background: white"
              class="q-ma-lg"
              @click="this.$router.go(-1)"
              label="cancel"
            />
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
      posts: [],
    };
  },
  methods: {
    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Invalid email";
    },

    async getPost() {
      try {
        const res = await this.$axios.get(
          `http://127.0.0.1:8000/api/specificpost/` + this.$route.params.id,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.posts = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async onSubmitPost() {
      // call api to submit
      try {
        console.log(this.posts)
        const res = await this.$axios.patch(
          `http://127.0.0.1:8000/api/post/update/` + this.$route.params.id,
          this.posts,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.data = res.data;
        alert("Post edited");
        this.$router.go(-1);
      } catch (e) {
        console.log(e);
      }
    },
    // async onSubmit() {
    //   try {
    //     const res = await this.$axios.patch(
    //       `http://localhost/api/post/update/` + this.$route.params.id,
    //       this.post,
    //       { headers: { Authorization: "Bearer" + Cookies.get("token") } }
    //     );
    //     this.post = res.data;
    //     this.$q.notify("Post edited");
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
  },
  created() {
    // this.getStaffData();
    this.getPost();
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
