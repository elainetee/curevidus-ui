<template>
  <q-page padding>
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
    <!-- <div class="container">
      <div class="card">
        <div class="card-header">Call</div>
        <div class="card-body">
          <agora-chat> </agora-chat>
        </div>
      </div>
    </div> -->
    <agora-chat> </agora-chat>
  </q-page>
</template>

<script>
import { Cookies } from "quasar";
import AgoraChat from "../components/AgoraChat.vue";
import ChatForm from "../components/ChatForm.vue";

export default {
  components: {
    AgoraChat,
  },

  data() {
    return {
      messages: [],
      user: [],
    };
  },

  methods: {},
};
</script>
