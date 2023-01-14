<template>
  <q-page padding>
    <div class="container">
      <div class="card">
        <div class="card-header">Call</div>
        <div class="card-body">
          <agora-chat> </agora-chat>
        </div>
      </div>
    </div>
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
