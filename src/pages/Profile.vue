<template>
  <q-page class="q-ma-xl">
    <div class="row">
      <h5>User details</h5>
    </div>
    <q-avatar size="200px">
      <q-img :src="store.user.avatar"/>
    </q-avatar>
    <q-card-actions>
      <label
        >File
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
      </label>
      <q-separator dark />
      <q-btn outline style="color: green" v-on:click="submitFile()"
        >Upload</q-btn
      >
    </q-card-actions>
    <div class="container row">
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
  </q-page>
</template>

<script>
import { Cookies } from "quasar";
import { store } from "../store.js";

export default {
  data() {
    return {
      user: [],
      store,
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
  },

  created() {
    this.getUsername();
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: flex-start;
}

.q-markup-table thead th {
  font-size: 15px;
}
</style>
