<template>
  <q-page padding>
    <q-item
      style="max-width: 650px"
      v-for="user in users"
      :key="user.id"
      class="q-py-md"
    >
      <q-item-section avatar top>
        <q-avatar size="xl">
          <!-- <img src="icons/userdd.png" /> -->
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-subtitle1"
          ><strong>{{ user.name }}</strong>
        </q-item-label>
      </q-item-section>
      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            v-if="user.friendstatus == '1'"
            @click="
              $router.push({
                name: 'sendmsg',
              })
            "
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
        </div>
      </q-item-section>
    </q-item>
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
  methods: {
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
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
