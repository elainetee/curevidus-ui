<template>
  <q-page padding>
    <q-toolbar class="bg-primary text-blue-grey-2 shadow-2">
      <q-toolbar-title>Search Result</q-toolbar-title>
    </q-toolbar>
    <q-list bordered>
      <q-item
        v-for="user in users"
        :key="user.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <q-img v-if="user.avatar != ''" :src="avatar(user.avatar)" />
            <q-img v-else src="../../public/icons/userdd.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption lines="1">{{ user.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            v-if="user.friendstatus == '1'"
            @click="$router.push('/chat')"
            color="white"
            text-color="black"
            label="Send message"
          />
          <q-btn
            @click="removeFriend(user.id)"
            v-if="user.friendstatus == '2'"
            color="white"
            text-color="black"
            label="Friend request sent"
          />
          <q-btn
            @click="scrollToBottom"
            v-if="user.friendstatus == '3'"
            color="white"
            text-color="black"
            label="Respond friend request"
          />
          <q-btn
            @click="addAsFriend(user.id)"
            v-if="user.friendstatus == '0'"
            color="white"
            text-color="black"
            label="Add as friend"
          />
        </q-item-section>
      </q-item>

      <q-separator />
    </q-list>
  </q-page>
</template>
<script>
import { Cookies } from "quasar";
export default {
  //Takes the "user" props from <chat-form> … :user="{{ Auth::user() }}"></chat-form> in the parent chat.blade.php.
  props: {
    // ["users"],
    users: String,
    searchFriend: Function,
  },
  data() {
    return {};
  },
  computed: {
    avatar() {
      return (v) => {
        return `http://127.0.0.1:8000` + v;
      };
    },
  },
  methods: {
    scrollToBottom() {
      this.$refs["bottom"].scrollIntoView({ behavior: "smooth" });
    },
    async addAsFriend(id) {
      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/friend/add/` + id,
          null,
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        );
        // this.$emit("friendsent", {
        //   user: this.user,
        // });
        this.user = res.data;
        this.searchFriend();
        alert("Friend request sent");
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
        this.user = res.data;
        this.searchFriend();
        alert("Friend request removed");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
