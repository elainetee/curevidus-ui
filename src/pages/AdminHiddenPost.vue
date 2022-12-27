<template>
  <q-page class="relative-position">
    <forum-button-admin></forum-button-admin>
    <q-separator class="divider" color="grey-2" size="10px" />
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-pa-lg">
        <q-list separator>
          <q-item v-for="post in posts" :key="post.id" class="q-py-md">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <!-- <img src="icons/userdd.png" /> -->
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle1"
                ><strong>{{ post.user_name }}</strong>
              </q-item-label>
              <q-item-label class="text-body1">
                {{ post.content }}
              </q-item-label>
              <q-item-label caption v-if="post.visibility == 'hidden'"
                >Post is hidden</q-item-label
              >
              <div class="qweet-icons row justify-between q-mt-sm">
                <q-btn
                  @click="hidePost(post.id)"
                  color="grey"
                  icon="hide_source"
                  size="sm"
                  flat
                  round
                />
              </div>
              <!-- <comment :comments="comments"></comment> -->
            </q-item-section>
            <q-item-section side top> {{ post.duration }} </q-item-section>
          </q-item>
          <q-separator inset="item" />
        </q-list>
        <!-- <q-pagination
          max="5"
          direction-links
          flat
          color="grey"
          active-color="primary"
        /> -->
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { Cookies } from "quasar";
import ForumButtonAdmin from "../components/ForumButtonAdmin.vue";
export default {
  components: {
    ForumButtonAdmin,
  },
  data() {
    return {
      posts: [],
      user: [],
      comments: [],
      comment: {
        comment_body: "",
      },
    };
  },

  methods: {
    async hidePost(id) {
      try {
        const res = await this.$axios.patch(
          `http://127.0.0.1:8000/api/post/hide/` + id,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.$q.notify("Post is changed to visible successfully");
        this.getPost();
      } catch (error) {
        console.log(error);
      }
    },

    async getUsername() {
      try {
        //  Axios.defaults.headers.common['Authorization'] = 'Bearer' + Cookies.get('token')
        const res = await this.$axios.get(`http://127.0.0.1:8000/api/user`, {
          headers: { Authorization: "Bearer" + Cookies.get("token") },
          contentType: "text/plain",
        });
        this.user = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getPost() {
      try {
        const res = await this.$axios.get(
          `http://127.0.0.1:8000/api/allhiddenpost`,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.posts = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getUsername();
    this.getPost();
  },
};
</script>

<style lang="sass">
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
</style>
