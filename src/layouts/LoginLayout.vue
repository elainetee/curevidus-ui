<template>
  <q-layout class="pg-bg-colour" view="hHh lpR fFf">

    <q-header reveal class="text-white">
      <q-toolbar class="bg-primary">
        <!-- <q-btn dense flat round @click="toggleLeftDrawer">
        <q-avatar size="30px">
          <img src="icons/noti.png">
        </q-avatar>
          
        </q-btn> -->
        <div class="q-pl-xl">
        </div>

        <q-toolbar-title class="text-logocolour">
          <q-avatar>
            <img src="icons/Curevid png.png">
          </q-avatar>
          CurevidUs
        </q-toolbar-title>

        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
      </q-toolbar>
      <!-- <div class="q-pa-xs q-pl-md row items-center pg-bg-colour">

        <q-toolbar class="pg-bg-colour">
          <q-btn dense flat round @click="toggleLeftDrawer">
            <q-avatar square size="30px">
              <img src="icons/noti.png">
            </q-avatar>
          </q-btn>

          <q-toolbar-title>
          </q-toolbar-title>

          <q-btn dense flat @click="toggleRightDrawer">
            <q-avatar square size="30px">
              <img src="icons/chat.png">
            </q-avatar>
          </q-btn>
        </q-toolbar>
      </div> -->
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>