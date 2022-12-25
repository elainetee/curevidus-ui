<template>
  <q-list separator>
    <q-item v-for="comment in comments" :key="comment.id" class="q-py-md">
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
            class="q-mb-lg"
            color="primary"
            icon="send"
            rounded
            unelevated
            no-caps
          />
        </div>
      </div>
</template>

<script>
import { Cookies } from "quasar";
export default {
  props: ["comments"],
  data() {
    return {
      comment_body: "",
    };
  },
  methods: {
    async addComment(id) {
      console.log(id);
      try {
        const res = await this.$axios.post(
          `http://127.0.0.1:8000/api/comment/create/` + id,
          this.comment_body,
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        );
        this.comment_body = res.data;
        this.$q.notify("Commented successfully");
      } catch (error) {
        console.log(error);
      }
    },

    async add(id) {
      //   try {
      //     const res = await this.$axios.post(
      //       `http://127.0.0.1:8000/api/friend/add/` + id,
      //       null,
      //       { headers: { Authorization: "Bearer" + Cookies.get("token") } }
      //     );
      this.$emit("commentopened", {
        user: this.user,
      });
      console.log("hello");
      //     this.user = res.data;
      //   } catch (error) {
      //     console.log(error);
      //   }
    },
  },

  //   created() {
  //   this.getComment();
  // },
};
</script>
