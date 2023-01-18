<template>
  <q-page class="relative-position">
    <div class="q-pa-md row items-start q-gutter-md" style="width: 250px">
      <q-card dark bordered class="bg-grey-9 my-card" v-for="n in news.articles"
        :key="n.title">
        <q-card-section>
          <div class="text-h6">{{n.title}}</div>
          <div class="text-subtitle2">{{n.author}}</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
          {{ n.description }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { Cookies } from "quasar";
export default {
  data() {
    return {
      news: [],
    };
  },
  methods: {
    async getNews() {
      try {
        const res = await this.$axios.get(
          `https://newsapi.org/v2/top-headlines?country=my&category=health&apiKey=b6b36bacced24f49b139b5a15649c7f1`,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.news = res.data;
        console.log(this.news);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getNews();
  },
};
</script>
