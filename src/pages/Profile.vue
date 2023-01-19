<template>
  <q-page-card
    class="fixed-center container-main my-card bg-secondary text-white"
  >
    <div id="user-detail-main" class="text-center q-pt-md">
      <p id="user-detail-tag">User details</p>
    </div>
    <div class="text-center">
      <q-card>
        <q-avatar size="100px" class="q-mt-sm">
          <q-img v-if="store.user.avatar != '' "
            :src="store.user.avatar"
          />
          <q-img v-else
            src="../../public/icons/userdd.png"
          />
        </q-avatar>
        <q-card-actions vertical>
          <label>
            <input
              type="file"
              style="color: red; width: 200px"
              id="file"
              ref="file"
              class="q-pa-sm"
              v-on:change="handleFileUpload()"
            />
          </label>
          <q-separator dark />
          <q-btn outline style="color: green" v-on:click="submitFile()"
            >Upload</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>

    <div class="">
      <div class="q-pt-xl">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-right">{{ user.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">Email</td>
              <td class="text-right">
                {{ user.email }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Condition</td>
              <td class="text-right">Mild fever</td>
            </tr>
            <tr>
              <td class="text-left">Tel no.</td>
              <td class="text-right">{{ user.tel_no }}</td>
            </tr>
          </tbody>
        </q-markup-table>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            @click="
              $router.push({ name: 'edit-profile', params: { id: user.id } })
            "
            color="white"
            text-color="black"
            label="Edit profile"
          />
          <q-btn color="white" text-color="black" label="change password" />
        </div>
      </div>
    </div>
  </q-page-card>
</template>

<script>
import { Cookies } from "quasar";
import { store } from "../store.js";

export default {
  data() {
    return {
      user: [],
      store,
      avatar: "",
    };
  },
  methods: {
    async getUsername() {
      try {
        //  Axios.defaults.headers.common['Authorization'] = 'Bearer' + Cookies.get('token')
        const res = await this.$axios.get(`http://127.0.0.1:8000/api/user`, {
          headers: { Authorization: "Bearer" + Cookies.get("token") },
          contentType: "text/plain",
        });
        this.user = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    handleFileUpload() {
      this.avatar = this.$refs.file.files[0];
    },
    async submitFile() {
      // call api to submit
      let formData = new FormData();
      formData.append("avatar", this.avatar);
      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/user/pp`,
          formData,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.store.user.avatar = `http://127.0.0.1:8000` + res.data.image_url;
        alert("Profile Picture Updated");
        // window.location.reload();
      } catch (e) {
        var obj = JSON.parse(e.response.data);
        var res = [];
        alert(obj.avatar.join(" "));
      }
    },
  },

  created() {
    this.getUsername();
  },
};
</script>

<style>
/* .container {
  display: flex;
  justify-content: flex-start;
} */
.container-main {
  width: 30%;
  border-width: 1px;
  border-style: solid;
  padding: 1px;
}

#user-detail-tag {
  font-size: 30px;
  font-weight: bold;
}

.q-markup-table thead th {
  font-size: 15px;
}
</style>
