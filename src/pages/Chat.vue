<template>
  <q-page padding>
    <div class="container">
      <div class="card">
        <div class="card-header">Chats</div>
        <div class="card-body">
          <chat-messages :messages="messages"></chat-messages>
        </div>
        <div class="card-footer">
          <chat-form v-on:messagesent="addMessage" :user="user"></chat-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { Cookies } from "quasar";
import ChatMessages from "../components/ChatMessages.vue";
import ChatForm from "../components/ChatForm.vue";

export default {
  components: {
    ChatMessages,
    ChatForm,
  },

  data() {
    return {
      messages: [],
      user: [],
    };
  },

  methods: {
    async getUser() {
      try {
        //  Axios.defaults.headers.common['Authorization'] = 'Bearer' + Cookies.get('token')
        const res = await this.$axios.get(`http://127.0.0.1:8000/api/user`, {
          headers: { Authorization: "Bearer" + Cookies.get("token") },
        });
        this.user = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getMessages() {
      try {
        const res = await this.$axios.get(`http://127.0.0.1:8000/api/chat`, {
          headers: { Authorization: "Bearer" + Cookies.get("token") },
        });
        this.messages = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addMessage(message) {
      console.log("hi");
      //Pushes it to the messages array
      this.messages.push(message);
      console.log(message);
      //POST request to the messages route with the message data in order for our Laravel server to broadcast it.
      // axios.post("/messages", message).then((response) => {
      //   console.log(response.data);
      // });
      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/messages`,
          message,
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        );
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getUser();
    this.getMessages();
    // window.Echo.private("chat").listen("MessageSent", (e) => {
    //   this.messages.push({
    //     message: e.message.message,
    //     user: e.user,
    //   });
    // });
  },
};
</script>
