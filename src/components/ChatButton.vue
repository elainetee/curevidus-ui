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
  </div>
      <q-separator class="divider" color="grey-2" size="10px" />
</template>
