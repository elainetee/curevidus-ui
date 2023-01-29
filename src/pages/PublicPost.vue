<template>
  <q-page class="relative-position">
    <div class="q-pa-md q-gutter-sm">
      <q-btn
        v-if="user.role_id == '1'"
        @click="$router.push({ name: 'post', params: { id: this.user.id } })"
        color="white"
        text-color="black"
        label="My post"
      />
      <q-btn
        @click="$router.push({ name: 'friend-post' })"
        color="white"
        text-color="black"
        label="Friend post"
      />
      <q-btn
        @click="$router.push({ name: 'public-post' })"
        color="white"
        text-color="black"
        label="Public post"
      />
    </div>
    <q-separator
      v-if="user.role_id == '1'"
      class="divider"
      color="grey-2"
      size="10px"
    />
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-pa-lg">
        <div
          v-if="user.role_id == '1'"
          class="q-py-lg q-px-md row items-end q-col-gutter-md"
        >
          <div class="col">
            <q-input
              v-model="post.content"
              class="new-post"
              placeholder="What's happening?"
              maxlength="280"
              bottom-slots
              counter
              autogrow
            >
              <template v-slot:before>
                <q-avatar size="xl">
                  <q-img
                    v-if="store.user.avatar != ''"
                    :src="store.user.avatar"
                  />
                  <q-img v-else src="../../public/icons/userdd.png" />
                </q-avatar>
              </template>
            </q-input>
          </div>
          <div class="col col-shrink">
            <q-btn
              @click="addPost()"
              :disable="!post.content"
              class="q-mb-lg"
              color="primary"
              label="Post"
              rounded
              unelevated
              no-caps
            />
          </div>
        </div>
        <q-separator class="divider" color="grey-2" size="10px" />
        <q-list separator>
          <q-item v-for="post in posts" :key="post.id" class="q-py-md">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <q-img :src="avatar(post.user.avatar)" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle1"
                ><strong>{{ post.user_name }}</strong>
              </q-item-label>
              <q-item-label class="text-body1">
                {{ post.content }}
              </q-item-label>
              <div class="qweet-icons row justify-between q-mt-sm">
                <q-btn
                  @click="
                    showComment = true;
                    getComment(post.id);
                    tempPost = post.id;
                  "
                  color="grey"
                  icon="comment"
                  size="sm"
                  flat
                  round
                >
                  <div>{{ post.comment_num }}</div>
                </q-btn>
                <!-- <q-btn
                  @click="getComment(post.id)"
                  color="grey"
                  icon="hide_source"
                  size="sm"
                  flat
                  round
                /> -->
              </div>
              <!-- <comment :comments="comments"></comment> -->
              <q-dialog v-model="showComment" persistent>
                <q-card>
                  <q-card-section class="row">
                    <div class="text-h6">Comment</div>
                    <q-space />
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      type="reset"
                      v-close-popup
                    />
                  </q-card-section>

                  <q-list separator>
                    <q-item
                      v-for="comment in comments"
                      :key="comment.id"
                      class="q-py-md"
                    >
                      <q-item-section>
                        <q-item-label class="text-subtitle1"
                          ><strong>{{ comment.user_name }}</strong>
                        </q-item-label>
                        <q-item-label class="text-body1">
                          {{ comment.comment_body }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
                    <div class="col">
                      <q-input
                        v-model="comment.comment_body"
                        class="new-comment"
                        placeholder="Write a comment..."
                        maxlength="280"
                        bottom-slots
                        counter
                        autogrow
                      >
                      </q-input>
                    </div>
                    <div class="col col-shrink">
                      <q-btn
                        @click="addComment(tempPost)"
                        class="q-mb-lg"
                        color="primary"
                        icon="send"
                        rounded
                        unelevated
                        no-caps
                      />
                    </div>
                  </div>
                </q-card>
              </q-dialog>
            </q-item-section>

            <!-- <q-item v-show="isComment"> -->
            <!-- <q-item> -->

            <!-- <comment v-on:commentopened="getComment" :post="post"></comment> -->

            <!-- </q-item> -->

            <q-item-section side top> {{ post.duration }} </q-item-section>
          </q-item>
          <q-separator inset="item" />
        </q-list>
        <!-- <q-pagination
          v-model="current"
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
import Comment from "../components/Comment.vue";
import { store } from "../store.js";

export default {
  // components: {
  //   Comment,
  // },
  data() {
    return {
      store,
      post: {
        content: "",
      },
      posts: [],
      user: [],
      comments: [],
      comment: {
        comment_body: "",
      },
      showComment: false,
      tempPost: "",
      current: 1,
    };
  },

  computed: {
    avatar() {
      return (v) => {
        return `http://127.0.0.1:8000` + v;
      };
    },
  },
  
  methods: {
    visitPostPage(props) {
      console.log(props);
      this.$router.push({
        name: "editPost",
        params: { id: props },
      });
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

    async deletePost(id) {
      try {
        const res = await this.$axios.delete(
          `http://127.0.0.1:8000/api/post/delete/` + id,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.posts = res.data;
        this.getPost();
        this.$q.notify("Post deleted successfully");
      } catch (error) {
        console.log(error);
      }
    },

    async getPost() {
      try {
        const res = await this.$axios.get(
          `http://127.0.0.1:8000/api/publicpost`,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.posts = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getComment(id) {
      try {
        const res = await this.$axios.get(
          `http://127.0.0.1:8000/api/comment/` + id,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.comments = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async addPost() {
      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/post/create/` + this.user.id,
          this.post,
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        );
        this.post = res.data;
        this.getPost();
        this.$q.notify("Posted successfully");
      } catch (error) {
        console.log(error);
      }
    },

    async addComment(id) {
      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/comment/create/` + this.tempPost,
          this.comment,
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        );
        this.comment = res.data;
        this.getComment(id);
        this.$q.notify("Commented successfully");
      } catch (error) {
        console.log(error);
      }
    },
    editPost(props) {
      this.$q
        .dialog({
          title: "Edit Post",
          cancel: true,
        })
        .onOk(async (e) => {
          try {
            const res = await this.$axios.patch(
              `http://127.0.0.1:8000/api/post/update/` + props,
              this.post.content,
              {
                headers: { Authorization: "Bearer" + Cookies.get("token") },
              }
            );
            this.$q.notify("Post updated");
          } catch (e) {
            console.log(e);
          }
        });
    },
  },

  visitUserPage(props) {
    this.$router.push({
      name: "editUser",
      params: { id: this.user.id },
    });
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
