<template>
  <main>
    <chat-button></chat-button>
    <!-- <div class="column online-users" xs3> -->
    <div>
      <q-splitter v-model="splitterModel" class="col-2">
        <template v-slot:before>
          <!-- <div v-if="store.user.role_id == 1">

            <q-separator size="2px"/>
            <div class="flex flex-center text-h6">
              Medical Staffs
            </div>
            <q-separator size="2px"/>
            <div
              v-for="friend in medicfriends"
              :key="friend.id"
              @click="activeFriend = friend.id"
            >
              <q-tabs v-model="tab" vertical class="text-teal">
                <q-tab
                  :name="friend.name"
                  :label="friend.name"
                >
                  <q-icon
                    name="circle"
                    :color="
                      onlineFriends.find((user) => user.id === friend.id)
                        ? 'green'
                        : 'red'
                    "
                  ></q-icon>
                </q-tab>
              </q-tabs>
            </div>
            <q-separator size="2px"/>
            <div class="flex flex-center text-h6">
              Friends
            </div>
            <q-separator size="2px"/>
          </div> -->
          <div
            v-for="friend in friends"
            :key="friend.id"
            @click="activeFriend = friend.id"
          >
            <q-tabs v-model="tab" vertical class="text-teal">
              <q-tab
                :name="friend.name"
                :label="friend.name"
              >
                <q-icon
                  name="circle"
                  :color="
                    onlineFriends.find((user) => user.id === friend.id)
                      ? 'green'
                      : 'red'
                  "
                ></q-icon>
                <!-- <q-item-section avatar>
                  <q-avatar size="30px" color="primary" text-color="white">
                    <img :src="friend.user.avatar" />
                    <q-img v-if="friend.avatar != ''" :src="friend.avatar" />
                <q-img v-else src="../../public/icons/userdd.png" />
                  </q-avatar>
                </q-item-section> -->
              </q-tab>
            </q-tabs>
          </div>
        </template>
        <!-- <q-list>
          <q-list-tile
            v-for="friend in friends"
            :color="friend.id == activeFriend ? 'green' : ''"
            :key="friend.id"
            @click="activeFriend = friend.id"
          >
            <q-list-tile-action>
              <q-icon
                :color="
                  onlineFriends.find((user) => user.id === friend.id)
                    ? 'green'
                    : 'red'
                "
              ></q-icon>
            </q-list-tile-action>

            <q-list-tile-content>
              <q-list-tile-title>{{ friend.name }}</q-list-tile-title>
            </q-list-tile-content>

            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>
          </q-list-tile>
        </q-list> -->

        <!-- <div >
            <q-tabs class="bg-teal text-yellow shadow-2">
              Lili
            </q-tabs>
          </div> -->
        <div id="privateMessageBox" class="messages">
          <message-list :all-messages="allMessages"></message-list>

          <!-- <div class="floating-div">
            <picker
              v-if="emoStatus"
              set="emojione"
              @select="onInput"
              title="Pick your emoji…"
            />
          </div> -->

          <!-- <div class="card-footer" fixed color="grey"> -->
          <!-- <v-layout row> -->
          <!-- <v-flex class="ml-2 text-right" xs1>
                <v-btn @click="toggleEmo" fab dark small color="pink">
                  <v-icon>insert_emoticon </v-icon>
                </v-btn>
              </v-flex> -->

          <!-- <v-flex xs1 class="text-center">
            <file-upload
              :post-action="'/private-messages/' + activeFriend"
              ref="upload"
              v-model="files"
              @input-file="$refs.upload.active = true"
              :headers="{ 'X-CSRF-TOKEN': token }"
            > -->
          <!-- <v-icon class="mt-3">attach_file</v-icon> -->
          <!-- </file-upload>
          </v-flex> -->

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

          <!-- </v-layout> -->
        </div>
      </q-splitter>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import MessageList from "../components/MessageList.vue";
import ChatButton from "../components/ChatButton.vue";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast";
import { Cookies } from "quasar";
import { store } from "../store.js";

export default {
  // props: ["user"],
  components: {
    // Picker,
    MessageList, ChatButton
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
      store,
      // token: document.head.querySelector('meta[name="csrf-token"]').content,
    };
  },

  computed: {
    friends() {
      return this.users.filter((user) => {
        if(this.store.user.role_id == 1){
          return ((user.id !== this.store.user.id) && user.role_id == 2);
        }
        return user.id !== this.store.user.id;
      });
    },
    medicfriends() {
      return this.users.filter((user) => {
        return ((user.id !== this.store.user.id) && user.role_id == 3);
      });
    },
  },

  watch: {
    // files: {
    //   deep: true,
    //   handler() {
    //     let success = this.files[0].success;
    //     if (success) {
    //       this.fetchMessages();
    //     }
    //   },
    // },
    activeFriend(val) {
      this.fetchMessages();
    },
    "$refs.upload"(val) {
      console.log(val);
    },
  },

  methods: {
    onTyping() {
      window.Echo.private("privatechat." + this.activeFriend).whisper(
        "typing",
        {
          user: this.user,
        }
      );
    },
    async sendMessage() {
      //check if there message
      if (!this.message) {
        return alert("Please enter message");
      }
      if (!this.activeFriend) {
        return alert("Please select friend");
      }

      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/pmessages/` + this.activeFriend,
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
      if (!this.activeFriend) {
        return alert("Please select friend");
      }
      try {
        const res = await this.$axios.get(
          `http://127.0.0.1:8000/api/pmessages/` + this.activeFriend,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.allMessages = res.data;
        setTimeout(this.scrollToEnd, 100);
      } catch (error) {
        console.log(error);
      }
    },

    async getFriend() {
      try {
        const res = await this.$axios.get(`http://127.0.0.1:8000/api/friend`, {
          headers: { Authorization: "Bearer" + Cookies.get("token") },
        });
        this.users = res.data;
        if (this.friends.length > 0) {
          this.activeFriend = this.friends[0].id;
        }
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
        window.Echo.join("plchat")
          .here((users) => {
            console.log("online", users);
            this.onlineFriends = users;
          })
          .joining((user) => {
            this.onlineFriends.push(user);
            console.log("joining", user.name);
          })
          .leaving((user) => {
            this.onlineFriends.splice(this.onlineFriends.indexOf(user), 1);
            console.log("leaving", user.name);
          });

        window.Echo.private("privatechat." + this.u.id)
          .listen("PrivateMessageSent", (e) => {
            console.log("pmessage sent");
            this.activeFriend = e.message.user_id;
            this.allMessages.push(e.message);
            setTimeout(this.scrollToEnd, 100);
          })
          .listenForWhisper("typing", (e) => {
            if (e.user.id == this.activeFriend) {
              console.log("typing");
              this.typingFriend = e.user;

              if (this.typingClock) clearTimeout();

              this.typingClock = setTimeout(() => {
                this.typingFriend = {};
              }, 9000);
            }
          });
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

  mounted() {},

  created() {
    this.getFriend();
    this.getUsername();
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
