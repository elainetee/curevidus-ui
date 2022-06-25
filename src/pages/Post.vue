<template>
  <q-page class="relative-position">
    <q-separator class="divider" color="grey-2" size="10px" />
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
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
                <img src="icons/userdd.png" />
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
              <img src="icons/userdd.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1"
              ><strong>{{ posts.user_name }}</strong>
            </q-item-label>
            <q-item-label class="text-body1">
              {{ post.content }}
            </q-item-label>
            <div class="qweet-icons row justify-between q-mt-sm">
              <q-btn color="grey" icon="comment" size="sm" flat round />

              <q-btn
                color="grey"
                icon="edit"
                size="sm"
                flat
                round
                @click="visitPostPage(post.id)"
              />
              <q-btn
                color="grey"
                icon="delete"
                size="sm"
                flat
                round
                @click="deletePost(post.id)"
              />
            </div>
          </q-item-section>

          <q-item-section side top> {{ post.duration }} </q-item-section>
        </q-item>
        <q-separator inset="item" />
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { Cookies } from "quasar";

export default {
  data() {
    return {
      post: {
        content: "",
      },
      posts: [],
      users: [],
    };
  },

  methods: {
    visitPostPage(props) {
      console.log(props);
      this.$router.push({
        name: "editPost",
        params: { id: props },
      });
    },
    async getUser() {
      try {
        const res = await this.$axios.get(`http://localhost/api/alluser`, {
          headers: { Authorization: "Bearer" + Cookies.get("token") },
        });
        this.users = res.data;
      } catch (error) {
        console.log(error);
        if (error.response.status == 401) {
          this.accessDenied = true;
        }
      }
    },

    async deletePost(id) {
      try {
        const res = await this.$axios.delete(
          `http://localhost/api/post/delete/` + id,
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
          `http://localhost/api/post/` + this.$route.params.id,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.posts = res.data;
        this.posts.user_name = this.posts[0].user_name;
      } catch (error) {
        console.log(error);
      }
    },

    async addPost() {
      try {
        // let newPost = {
        //   content: this.post.content,
        //   created_at: Date.now(),
        // };
        // this.posts.unshift(newPost);
        const res = await this.$axios.post(
          `http://localhost/api/post/create/` + this.$route.params.id,
          this.post,
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        );
        this.post = res.data;
        this.$q.notify("Posted successfully");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },

    deleteStaff(props) {
      this.$q
        .dialog({
          message: "Are you sure to delete this account?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          try {
            const res = await this.$axios.delete(
              `http://localhost/api/user/` + props.row.id,
              {
                headers: { Authorization: "Bearer" + Cookies.get("token") },
              }
            );
            this.getUser();
            alert("Account deleted");
          } catch (e) {
            console.log(e);
          }
        });
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
              `http://localhost/api/post/update/` + props,
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
      params: { id: props.row.id },
    });
  },

  // editStaff(props) {
  //   this.$q
  //     .dialog({
  //       component: editStaff,
  //       componentProps: {
  //         title: "Edit Staff",
  //         user: props.row,
  //         tableKeys: this.tableKey,
  //       },
  //     })
  //     .onOk(async (e) => {
  //       // let { client } = e;
  //       // this.getClient();
  //       alert("Update successfully");
  //       window.location.reload();
  //     });
  // },

  // editAccess(props) {
  //   var myArr = [];
  //   if (props.row.company_id){
  //   var a = props.row.company_id.toString();
  //   if (a.indexOf(",") > -1) {
  //     myArr = a.split(",").map(Number);
  //   } else {
  //     myArr.push(props.row.company_id);
  //   }
  //   }else{
  //     myArr = [];
  //   }
  //   const arr = [];
  //   for (var i = 0; i < this.options.length; i++) {
  //     arr.push({ label: this.options[i].name, value: this.options[i].id });
  //   }
  //   this.$q
  //     .dialog({
  //       title: "Access to",
  //       message: "Choose company that you want to give access to this staff",
  //       options: {
  //         model: myArr,
  //         items: arr,
  //         type: "checkbox",
  //       },
  //       cancel: true,
  //     })
  //     .onOk(async (options) => {
  //       try {
  //         let access = options.toString();
  //         const res = await this.$axios.patch(
  //           `${process.env.API}/api/admin/access/` + props.row.id,
  //           { access },
  //           {
  //             headers: { Authorization: "Bearer" + Cookies.get("token") },
  //           }
  //         );
  //         this.data = res.data;
  //         this.getUser();
  //         alert("Changes saved");
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     });
  // },

  //   watch: {
  //     $route(to, from) {
  //       this.getUser();
  //     },
  //   },

  created() {
    // this.getUser();
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
