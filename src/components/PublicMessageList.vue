<template>
  <div>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 900px">
        <div v-for="message in allMessages" :key="message.id">
          <q-chat-message
            v-if="store.user.id === message.user_id"
            name="me"
            :avatar="store.user.avatar"
            :text="[message.message]"
            :stamp="moment(message.created_at)"
            sent
          />
          <q-chat-message
            v-else
            :text="[message.message]"
            :avatar="avatar(message.user.avatar)"
            :name="message.user_name"
            :stamp="moment(message.created_at)"
          />
        </div>
        <!-- <div v-for="ac in activity" :key="ac">
          <q-chat-message :label="ac" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
import moment from "moment";

export default {
  props: ["allMessages", "activity"],
  data() {
    return {
      date: [],
      store,
    };
  },
  methods: {},
  computed: {
    moment() {
      return (v) => {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
      };
    },
    avatar() {
      return (v) => {
        return `http://127.0.0.1:8000` + v;
      };
    },
  },
};
</script>

<style scoped>
.chat-card {
  margin-bottom: 140px;
}
.floating-div {
  position: fixed;
}
.chat-card img {
  max-width: 300px;
  max-height: 200px;
}
.tab {
  position: fixed;
}
</style>
