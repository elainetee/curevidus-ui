<template>
  <q-layout class="pg-bg-colour" view="hHh lpR fFf">
    <q-header reveal class="text-white">
      <q-toolbar class="bg-primary">
        <!-- <q-btn dense flat round @click="toggleLeftDrawer">
        <q-avatar size="30px">
          <img src="icons/noti.png">
        </q-avatar>
          
        </q-btn> -->
        <div class="q-pl-xl"></div>

        <q-toolbar-title class="text-logocolour">
          <q-avatar>
            <img src="icons/Curevid png.png" />
          </q-avatar>
          CurevidUs
        </q-toolbar-title>

        <!-- <q-btn dense flat round @click="toggleLeftDrawer">
        <q-avatar size="30px">
          <img src="icons/noti.png">
        </q-avatar>
        </q-btn> -->
        <div class="q-pr-xl cursor-pointer non-selectable">
          <q-avatar square size="30px">
            <img src="icons/userdd.png" />
            <q-menu auto-close>
              <q-list dense style="min-width: 100px">
                <q-item clickable>
                  <q-item-section>My Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section @click="logout()">Logout</q-item-section>
                </q-item>
                <!-- <q-item clickable>
                  <q-item-section>Paste</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Select All</q-item-section>
                </q-item> -->
              </q-list>
            </q-menu>
          </q-avatar>
        </div>

        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
      </q-toolbar>
      <div class="q-pa-xs q-pl-md row items-center pg-bg-colour">
        <q-toolbar class="pg-bg-colour">
          <q-btn dense flat round @click="toggleLeftDrawer">
            <q-avatar square size="30px">
              <img src="icons/noti.png" />
            </q-avatar>
          </q-btn>

          <q-toolbar-title> </q-toolbar-title>

          <q-btn dense flat @click="toggleRightDrawer">
            <q-avatar square size="30px">
              <img src="icons/chat.png" />
            </q-avatar>
          </q-btn>
        </q-toolbar>
      </div>
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
import { ref } from "vue";

export default {
  data() {},

  methods: {
    async logout() {
      try {
        const res = await this.$axios.post(
          `http://localhost/api/logout`,
          { token: Cookies.get("token") },
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
      } catch (error) {
        console.log(error);
      }
      const config = { path: "/", sameSite: "strict" };
      // Cookies.remove("token", config);
      // Cookies.remove("token");
      this.$q.notify("Successfully logged out");
      this.$router.push("/");
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script>

<!-- <template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>-->
