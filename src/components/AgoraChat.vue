<template>
  <main>
    <!-- <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <img src="img/agora-logo.png" alt="Agora Logo" class="img-fuild" />
        </div>
      </div>
    </div> -->
    <div class="container my-5">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Video Call Friends</q-toolbar-title>
      </q-toolbar>
      <q-list bordered>
        <q-item
          v-for="user in alluser"
          :key="user.id"
          class="q-my-sm"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              <q-img :src="avatar(user.avatar)" />

              <!-- <q-img v-if="friend.avatar != ''" :src="friend.avatar" />
                <q-img v-else src="../../public/icons/userdd.png" /> -->
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="video_call" @click="placeCall(user.id, user.name)" />
            <span class="badge badge-light">{{
              getUserOnlineStatus(user.id)
            }}</span>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Pending call -->
      <!-- <div class="row my-5" v-if="pendingCall">
        Pending user to accept call
        </div> -->

      <!-- Incoming Call  -->
      <div class="row my-5" v-if="incomingCall">
        <div class="col-12">
          <p>
            Incoming Call From <strong>{{ incomingCaller }}</strong>
          </p>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="declineCall"
            >
              Decline
            </button>
            <button
              type="button"
              class="btn btn-success ml-5"
              @click="acceptCall"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
      <!-- End of Incoming Call  -->
    </div>

    <div id="video-container" v-if="callPlaced">
      <div id="local-video"></div>
      <div id="remote-video"></div>

      <div class="action-btns">
        <button type="button" class="btn btn-info" @click="handleAudioToggle">
          {{ mutedAudio ? "Unmute" : "Mute" }}
        </button>
        <button
          type="button"
          class="btn btn-primary mx-4"
          @click="handleVideoToggle"
        >
          {{ mutedVideo ? "ShowVideo" : "HideVideo" }}
        </button>
        <q-btn color="red" @click="endCall"> EndCall </q-btn>
      </div>
    </div>
  </main>
</template>

<script>
import { Cookies } from "quasar";
import { store } from "../store.js";
import AgoraRTC from "agora-rtc-sdk";

export default {
  name: "AgoraChat",
  // props: ["authuser", "authuserid", "agora_id"],
  data() {
    return {
      pendingCall: false,
      callPlaced: false,
      client: null,
      localStream: null,
      mutedAudio: false,
      mutedVideo: false,
      userOnlineChannel: null,
      onlineUsers: [],
      incomingCall: false,
      incomingCaller: "",
      agoraChannel: null,
      duration: null,
      store,
      alluser: [],
    };
  },

  computed: {
    avatar() {
      return (v) => {
        return `http://127.0.0.1:8000` + v;
      };
    },
  },

  mounted() {
    this.getUser();
    this.initUserOnlineChannel();
    this.initUserOnlineListeners();

    // let recaptchaScript = document.createElement("script");
    // recaptchaScript.setAttribute(
    //   "src",
    //   "https://cdn.agora.io/sdk/release/AgoraRTCSDK-3.3.1.js"
    // );
    // document.head.appendChild(recaptchaScript);
  },

  methods: {
    async getUser() {
      try {
        const res = await this.$axios.get(`http://127.0.0.1:8000/api/friend`, {
          headers: { Authorization: "Bearer" + Cookies.get("token") },
        });
        this.alluser = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Presence Broadcast Channel Listeners and Methods
     * Provided by Laravel.
     * Websockets with Pusher
     */
    initUserOnlineChannel() {
      this.userOnlineChannel = window.Echo.join("agora-online-channel");
    },

    initUserOnlineListeners() {
      this.userOnlineChannel.here((users) => {
        this.onlineUsers = users;
      });

      this.userOnlineChannel.joining((user) => {
        // check user availability
        const joiningUserIndex = this.onlineUsers.findIndex(
          (data) => data.id === user.id
        );
        if (joiningUserIndex < 0) {
          this.onlineUsers.push(user);
        }
      });
      // console.log(this.onlineUsers);

      this.userOnlineChannel.leaving((user) => {
        const leavingUserIndex = this.onlineUsers.findIndex(
          (data) => data.id === user.id
        );
        this.onlineUsers.splice(leavingUserIndex, 1);
      });

      // listen to incoming call
      this.userOnlineChannel.listen("MakeAgoraCall", ({ data }) => {
        if (parseInt(data.userToCall) === parseInt(this.store.user.id)) {
          const callerIndex = this.onlineUsers.findIndex(
            (user) => user.id === data.from
          );
          this.incomingCaller = this.onlineUsers[callerIndex]["name"];
          this.incomingCall = true;

          // the channel that was sent over to the user being called is what
          // the receiver will use to join the call when accepting the call.
          this.agoraChannel = data.channelName;
          console.log("xxx is calling");
        }
      });
    },

    getUserOnlineStatus(id) {
      const onlineUserIndex = this.onlineUsers.findIndex(
        (data) => data.id === id
      );
      if (onlineUserIndex < 0) {
        return "Offline";
      }
      return "Online";
    },

    async placeCall(id, calleeName) {
      try {
        // channelName = the caller's and the callee's id. you can use anything. tho.
        const channelName = `${this.store.user.name}_${calleeName}`;
        const tokenRes = await this.generateToken(channelName);
        // Broadcasts a call event to the callee and also gets back the token
        await this.$axios.post(
          `http://127.0.0.1:8000/api/agora/call-user`,
          {
            user_to_call: id,
            channel_name: channelName,
          },
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        );

        this.initializeAgora();
        this.joinRoom(tokenRes.data, channelName);
      } catch (error) {
        console.log(error);
      }
    },

    async acceptCall() {
      this.initializeAgora();
      const tokenRes = await this.generateToken(this.agoraChannel);
      this.joinRoom(tokenRes.data, this.agoraChannel);
      this.incomingCall = false;
      this.callPlaced = true;
      this.client.getSessionStats(10).then((stats) => {
        console.log(stats);
      });
    },

    declineCall() {
      // You can send a request to the caller to
      // alert them of rejected call
      this.incomingCall = false;
    },

    generateToken(channelName) {
      // return axios.post("/agora/token", {
      //   channelName,
      return this.$axios.post(
        `http://127.0.0.1:8000/api/agora/token`,
        { channelName },
        { headers: { Authorization: "Bearer" + Cookies.get("token") } }
      );
    },

    /**
     * Agora Events and Listeners
     */
    initializeAgora() {
      this.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
      this.client.init(
        process.env.AGORA_APP_ID,
        () => {
          // console.log(this.client);
          console.log("AgoraRTC client initialized");
        },
        (err) => {
          console.log("AgoraRTC client init failed", err);
        }
      );
    },

    async joinRoom(token, channel) {
      this.client.join(
        token,
        channel,
        this.store.user.name,
        (uid) => {
          console.log("User " + uid + " join channel successfully");
          this.callPlaced = true;
          this.createLocalStream();
          this.initializedAgoraListeners();
        },
        (err) => {
          console.log("Join channel failed", err);
        }
      );
    },

    initializedAgoraListeners() {
      //   Register event listeners
      this.client.on("stream-published", function (evt) {
        console.log("Publish local stream successfully");
        console.log(evt);
      });

      //subscribe remote stream
      this.client.on("stream-added", ({ stream }) => {
        console.log("New stream added: " + stream.getId());
        this.client.subscribe(stream, function (err) {
          console.log("Subscribe stream failed", err);
        });
      });

      this.client.on("stream-subscribed", (evt) => {
        // Attach remote stream to the remote-video div
        evt.stream.play("remote-video");
        this.client.publish(evt.stream);
      });

      this.client.on("stream-removed", ({ stream }) => {
        console.log(String(stream.getId()));
        stream.close();
      });

      this.client.on("peer-online", (evt) => {
        console.log("peer-online", evt.uid);
      });

      this.client.on("peer-leave", (evt) => {
        var uid = evt.uid;
        var reason = evt.reason;
        console.log("remote user left ", uid, "reason: ", reason);
        alert("The call is ended.");
        this.endCall();
      });

      this.client.on("stream-unpublished", (evt) => {
        console.log(evt);
      });
    },

    createLocalStream() {
      this.localStream = AgoraRTC.createStream({
        audio: true,
        video: true,
      });

      // Initialize the local stream
      this.localStream.init(
        () => {
          // Play the local stream
          this.localStream.play("local-video");
          // Publish the local stream
          this.client.publish(this.localStream, (err) => {
            console.log("publish local stream", err);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },

    async endCall() {
      this.localStream.close();
      // this.client.unpublish();
      console.log(this.client);
      this.client.leave(
        () => {
          console.log("Leave channel successfully");
          this.callPlaced = false;
        },
        (err) => {
          console.log("Leave channel failed");
        }
      );
    },

    handleAudioToggle() {
      if (this.mutedAudio) {
        this.localStream.unmuteAudio();
        this.mutedAudio = false;
      } else {
        this.localStream.muteAudio();
        this.mutedAudio = true;
      }
    },

    handleVideoToggle() {
      if (this.mutedVideo) {
        this.localStream.unmuteVideo();
        this.mutedVideo = false;
      } else {
        this.localStream.muteVideo();
        this.mutedVideo = true;
      }
    },
  },

  //   created() {
  //   this.getUser();
  // },
};
</script>

<style>
main {
  margin-top: 50px;
}

#video-container {
  width: 700px;
  height: 500px;
  max-width: 90vw;
  max-height: 50vh;
  margin: 0 auto;
  border: 1px solid #099dfd;
  position: relative;
  box-shadow: 1px 1px 11px #9e9e9e;
  background-color: #fff;
}

#local-video {
  width: 30%;
  height: 30%;
  position: absolute;
  left: 10px;
  bottom: 10px;
  border: 1px solid #fff;
  border-radius: 6px;
  z-index: 2;
  cursor: pointer;
}

#remote-video {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.action-btns {
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -50px;
  z-index: 3;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
