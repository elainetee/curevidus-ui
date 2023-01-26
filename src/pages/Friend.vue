<template>
  <q-page class="relative-position">
    <div class="q-pa-md">
      <div class="q-gutter-md row justify-between">
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            @click="$router.push({ name: 'friend' })"
            color="white"
            text-color="black"
            label="Friendlist"
          /><q-btn
            @click="$router.push({ name: 'call' })"
            color="white"
            text-color="black"
            label="Call"
          />
        </div>
        <q-input
          v-model="search.input"
          filled
          type="search"
          hint="Search friends by name or email!"
          @keyup.enter="searchFriend"
        >
          <template v-slot:append>
            <q-btn icon="search" @click="searchFriend()" />
          </template>
        </q-input>
      </div>
      <q-separator class="divider" color="grey-4" size="1px" />
      <q-scroll-area class="absolute full-width full-height q-pr-lg">
        <!-- <div class="text-h6">Friendlist</div> -->
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>Friend list</q-toolbar-title>
        </q-toolbar>
        <q-list bordered>
          <q-item
            v-for="friend in friends"
            :key="friend.id"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <img src="../../public/icons/userdd.png" />
                <!-- <q-img v-if="friend.avatar != ''" :src="friend.avatar" />
                <q-img v-else src="../../public/icons/userdd.png" /> -->
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ friend.name }}</q-item-label>
              <q-item-label caption lines="1">{{ friend.email }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="chat_bubble" color="grey" @click="$router.push('/chat')"/>
            </q-item-section>
          </q-item>

          <q-separator />
        </q-list>
        <!-- <q-item
          style="max-width: 650px"
          v-for="friend in friends"
          :key="friend.id"
          class="q-py-md"
        >
          <q-item-section avatar top>
            <q-avatar size="xl">
              <img src="icons/userdd.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1"
              ><strong>{{ friend.name }}</strong>
              <q-separator class="divider" color="grey-4" size="2px" />
            </q-item-label>
          </q-item-section>
        </q-item> -->
        <q-separator class="divider" color="grey-4" size="5px" />
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>Pending Friend Request</q-toolbar-title>
        </q-toolbar>
        <q-list bordered>
          <q-item
            v-for="pendingrequest in pendingrequests"
            :key="pendingrequest.id"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <img src="../../public/icons/userdd.png" />
                <!-- <q-img v-if="friend.avatar != ''" :src="friend.avatar" />
                <q-img v-else src="../../public/icons/userdd.png" /> -->
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ pendingrequest.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                color="green"
                label="Accept"
                @click="acceptFriend(pendingrequest.id)"
                size="sm"
                no-caps
              />
            </q-item-section>

            <q-item-section side>
              <q-btn
                color="red"
                label="Reject"
                @click="removeFriend(pendingrequest.id)"
                size="sm"
                no-caps
              />
            </q-item-section>
          </q-item>

          <q-separator />
        </q-list>
        <!-- <friendlist v-on:friendsent="addAsFriend" :users="users"></friendlist> -->
        <friendlist :users="users" :searchFriend="searchFriend"></friendlist>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
import { Cookies } from "quasar";
import Friendlist from "../components/Friendlist.vue";
export default {
  components: {
    Friendlist,
  },
  data() {
    return {
      search: {
        input: "",
      },
      users: [],
      friends: [],
      pendingrequests: [],
    };
  },
  methods: {
    async searchFriend() {
      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/friend/search`,
          this.search,
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        );
        this.users = res.data;
      } catch (e) {
        alert(e.response.data);
        console.log(e);
      }
    },

    async acceptFriend(id) {
      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/friend/accept/` + id,
          null,
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        );
        this.pendingrequests = res.data;
        this.getFriend();
      } catch (error) {
        console.log(error);
      }
    },

    async removeFriend(id) {
      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/friend/remove/` + id,
          null,
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        );
        this.pendingrequests = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getFriend() {
      try {
        const res = await this.$axios.get(`http://127.0.0.1:8000/api/friend`, {
          headers: { Authorization: "Bearer" + Cookies.get("token") },
        });
        this.friends = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getFriendRequest() {
      try {
        const res = await this.$axios.get(
          `http://127.0.0.1:8000/api/friend/pendingfrom`,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.pendingrequests = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getFriend();
    this.getFriendRequest();
  },
};
</script>
