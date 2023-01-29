<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      @click="$router.push({ name: 'chat' })"
      color="white"
      text-color="black"
      label="Private Room"
    />
    <q-btn
      @click="$router.push({ name: 'public-chat' })"
      color="white"
      text-color="black"
      label="Public Room"
    />
    <q-btn v-if="store.user.role_id=='1'"
      @click="$router.push({ name: 'medical-chat' })"
      color="white"
      text-color="black"
      label="Medical Chat"
    />
  </div>
      <q-separator class="divider" color="grey-2" size="10px" />
</template>

<script>
import { store } from "../store.js";

export default {
  data() {
    return {
      store,
    };
  },
}
</script>


