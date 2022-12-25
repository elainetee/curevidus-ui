<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      @click="$router.push({ name: 'admin-post' })"
      color="white"
      text-color="black"
      label="Visible post"
    />
    <q-btn
      @click="$router.push({ name: 'hidden-post' })"
      color="white"
      text-color="black"
      label="Hidden post"
    />
  </div>
</template>
