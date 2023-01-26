<template>
  <main>
    <chat-button></chat-button>
    <!-- <div class="q-gutter-y-md" style="max-width: 2000px">
      <q-tabs class="bg-teal text-yellow shadow-2">
        <q-tab>Public Chatroom</q-tab>
      </q-tabs>
    </div> -->
    <q-splitter v-model="splitterModel" class="col-2">
        <template v-slot:before>
          <div
            v-for="friend in onlineFriends"
            :key="friend.id"
            @click="activeFriend = friend.id"
          >
            <q-tabs v-model="tab" vertical class="text-teal">
              <q-tab class="text-black" name="mails" label="Members:" >
              </q-tab>
              <q-tab name="mails" :label="friend.name" >
              </q-tab>
            </q-tabs>
          </div>
        </template>
    <div id="privateMessageBox" class="messages">
      <public-message-list
        :all-messages="allMessages"
        :activity="activity"
      ></public-message-list>
      <div class="input-group">
        <!-- //Input field. -->
        <q-input
          standout
          bottom-slots
          v-model="message"
          label="Type your message here..."
          counter
          dense
          @keyup.enter="sendMessage"
        >
          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="sendMessage" />
          </template>
        </q-input>
      </div>
    </div>
    </q-splitter>
  </main>
</template>

<script>
import { ref } from "vue";
import PublicMessageList from "../components/PublicMessageList.vue";
import ChatButton from "../components/ChatButton.vue";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast";
import { Cookies } from "quasar";
import { store } from "../store.js";

export default {
  // props: ["user"],
  components: {
    // Picker,
    PublicMessageList,ChatButton
  },

  data() {
    return {
      tab: ref("mails"),
      splitterModel: ref(20),
      message: null,
      files: [],
      activeFriend: null,
      typingFriend: {},
      onlineFriends: [],
      allMessages: [],
      typingClock: null,
      emoStatus: false,
      users: [],
      u: [],
      activity: [],
      store,
      // token: document.head.querySelector('meta[name="csrf-token"]').content,
    };
  },

  methods: {
    // onTyping() {
    //   window.Echo.private("privatechat." + this.activeFriend).whisper(
    //     "typing",
    //     {
    //       user: this.user,
    //     }
    //   );
    // },
    async sendMessage() {
      //check if there message
      if (!this.message) {
        return alert("Please enter message");
      }

      // if (!this.activeFriend) {
      //   return alert("Please select friend");
      // }

      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/messages`,
          { message: this.message },
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        );
        this.message = null;
        this.allMessages.push(res.data.message);
        setTimeout(this.scrollToEnd, 100);
      } catch (error) {
        console.log(error);
      }
    },

    async fetchMessages() {
      try {
        const res = await this.$axios.get(`http://127.0.0.1:8000/api/chat`, {
          headers: { Authorization: "Bearer" + Cookies.get("token") },
        });
        this.allMessages = res.data;
        setTimeout(this.scrollToEnd, 100);
      } catch (error) {
        console.log(error);
      }
    },

    async getUsername() {
      try {
        const res = await this.$axios.get(`http://127.0.0.1:8000/api/user`, {
          headers: { Authorization: "Bearer" + Cookies.get("token") },
        });
        this.u = res.data;
        window.Echo.join("publicchat")
          .here((users) => {
            console.log("online", users);
            this.onlineFriends = users;
          })
          .joining((user) => {
            this.onlineFriends.push(user);
            console.log("joining", user.name);
            // this.activity.push(user.name + " joined the room");
            setTimeout(this.scrollToEnd, 100);
          })
          .leaving((user) => {
            this.onlineFriends.splice(this.onlineFriends.indexOf(user), 1);
            console.log("leaving", user.name);
            // this.activity.push(user.name+ " left the room");
            setTimeout(this.scrollToEnd, 100);
          });

        window.Echo.private("publicchat").listen("MessageSent", (e) => {
          console.log("public message sent");
          // this.activeFriend = e.message.user_id;
          this.allMessages.push(e.message);
          setTimeout(this.scrollToEnd, 100);
        });
        // .listenForWhisper("typing", (e) => {
        //   if (e.user.id == this.activeFriend) {
        //     console.log("typing");
        //     this.typingFriend = e.user;

        //     if (this.typingClock) clearTimeout();

        //     this.typingClock = setTimeout(() => {
        //       this.typingFriend = {};
        //     }, 9000);
        //   }
        // });
      } catch (error) {
        console.log(error);
      }
    },

    scrollToEnd() {
      document.getElementById("privateMessageBox").scrollTo(0, 99999);
    },
    toggleEmo() {
      this.emoStatus = !this.emoStatus;
    },
    onInput(e) {
      if (!e) {
        return false;
      }
      if (!this.message) {
        this.message = e.native;
      } else {
        this.message = this.message + e.native;
      }
      this.emoStatus = false;
    },

    onResponse(e) {
      console.log("onresponse file up", e);
    },
  },

  computed: {
    member() {
      return (v) => {
        return v.length;
      };
    },
  },

  mounted() {},

  created() {
    // this.getFriend();
    this.getUsername();
    this.fetchMessages();
  },
};
</script>

<style>
/* .online-users, */
.messages {
  overflow-y: scroll;
  height: 550px;
  width: 80%;
}
.input-group {
  position: fixed;
  width: 70%;
  bottom: 0;
}
</style>
