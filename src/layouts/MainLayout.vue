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
          <q-avatar
            class="cursor-pointer"
            @click="$router.push({ name: 'homepage' })"
          >
            <img src="icons/Curevid png.png" />
          </q-avatar>
          CurevidUs
        </q-toolbar-title>

        <div class="q-pr-xl row text-navbar cursor-pointer non-selectable">
          <div
            class="q-mr-xl"
            v-if="store.user.role_id == '3'"
            @click="$router.push({ name: 'medicine' })"
          >
            Medicine
          </div>
          <div v-if="store.user.role_id == '1'"
            class="q-mr-xl"
            @click="
              $router.push({ name: 'report', params: { id: store.user.id } })
            "
          >
          Condition Report
        </div>
          <!-- <div class="q-mr-xl" @click="$router.push({ name: 'report', params: { id: user.id } })"> -->
          
          <!-- <div class="q-mr-xl" v-if="user.role_id == '3'" @click="$router.push({ name: 'medicine', query: {roleid: this.user.role_id }})">Medicine</div> -->
          <div class="q-mr-xl" v-if="store.user.role_id == '1'" @click="$router.push({ name: 'medicinepat', query: {roleid: this.store.user.role_id }})">Medicine</div>
          
          <div class="q-mr-xl" v-if="store.user.role_id == '1'" @click="$router.push({ name: 'cart'})">My Cart</div>
          <div class="q-mr-xl" v-if="store.user.role_id == '3'" @click="$router.push({ name: 'order'})">Orders</div>
          
          <!-- <div class="q-mr-xl" v-if="store.user.role_id == '3'">Patients</div> -->
          <!-- <div class="q-mr-xl" v-if="user.role_id == '3'">Patients</div> -->
          <div class="q-mr-xl" @click="$router.push({ name: 'friend' })" v-else>
            Friends
          </div>
          <!-- <div
            class="q-mr-xl"
            @click="$router.push({ name: 'post', params: { id: user.id } })"
          > -->
          <div
            class="q-mr-xl"
            v-if="store.user.role_id == '3'"
            @click="$router.push({ name: 'admin-post' })"
          >
            Forum
          </div>
          <div
            class="q-mr-xl"
            v-else
            @click="$router.push({ name: 'friend-post' })"
          >
            Forum
          </div>
          <div
            @click="$router.push({ name: 'manage-account' })"
            class="q-mr-xl"
            v-if="store.user.role_id == '3'"
          >
            Manage Account
          </div>
        </div>

        <!-- <q-btn dense flat round @click="toggleLeftDrawer">
        <q-avatar size="30px">
          <img src="icons/noti.png">
        </q-avatar>
        </q-btn> -->{{ store.user.name }}
        <div class="q-pr-xl cursor-pointer non-selectable">
          <q-avatar round size="30px">
            <q-img v-if="store.user.avatar != null" :src="store.user.avatar" />
            <q-img v-else src="icons/userdd.png" />
             <!-- <q-badge floating color="grey"> -->
            <q-img v-if="store.user.avatar != ''" :src="store.user.avatar" />
            <q-img v-else src="../../public/icons/userdd.png" />
            <!-- <q-badge transparent floating color="grey">
              <q-icon name="expand_more" color="white"
            /></q-badge> -->
            <q-menu auto-close>
              <q-list dense style="min-width: 100px">
                <q-item clickable>
                  <q-item-section
                    @click="
                      $router.push({
                        name: 'profile',
                        params: { id: this.store.user.id },
                      })
                    "
                    >My Profile</q-item-section
                  >
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
          <!-- <q-btn dense flat round @click="toggleLeftDrawer">
            <q-avatar square size="30px">
              <img src="icons/noti.png" />
            </q-avatar>
          </q-btn> -->

          <q-toolbar-title> </q-toolbar-title>

          <!-- <q-btn dense flat @click="toggleRightDrawer"> -->
          <q-btn dense flat>
            <q-avatar
              square
              size="30px"
              v-if="store.user.role_id == '1' || store.user.role_id == '2'"
            >
              <img src="icons/chat.png" @click="$router.push('/chat')" />
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
import { Cookies } from "quasar";
import { store } from "../store.js";
// import { userdetails } from '../components/userId.js';
// import { reactive } from 'vue';

// export const userid = reactive({
//     users: ref(this.user),
//   });

export default {
  data() {
    return {
      store,
    };
  },
  // created(){
  //   // this.user = userdetails.user
  // },

  methods: {
    async logout() {
      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/logout`,
          { token: Cookies.get("token") },
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
      } catch (error) {
        console.log(error);
      }
      const config = { path: "/", sameSite: "strict" };
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
  mounted() {
    this.store.getUsername();
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
