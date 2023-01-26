<template>
  <q-page class="container">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        style="width: 400px"
        dark
        bordered
        class="bg-grey-9 my-card"
        v-for="n in news.articles"
        :key="n.title"
      >
        <!-- <q-img :src="n.urlToImage" @click="redirect(n.url)"> </q-img> -->
        <a :href="n.url" target="_blank" rel="noreferrer">
          <q-img :src="n.urlToImage"> </q-img>
        </a>
        <q-card-section stle="color inherit">
          <a :href="n.url" target="_blank" rel="noreferrer"
            ><div class="text-h6">{{ n.title }}</div></a
          >
          <div class="text-subtitle2">{{ n.author }}</div>
          <div class="text-caption">{{ moment(n.publishedAt) }}</div>
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
import moment from "moment";
export default {
  data() {
    return {
      news: [],
    };
  },
  methods: {
    redirect(url) {
      window.location.href = url;
    },
    async getNews() {
      try {
        const res = await this.$axios.get(
          `https://newsapi.org/v2/everything?language=en&domains=thestar.com.my,malaymail.com,channelnewsasia.com,freemalaysiatoday.com,thevibes.com&apiKey=b6b36bacced24f49b139b5a15649c7f1&q=covid&searchIn=title&sortBy=publishedAt`,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.news = res.data;
        console.log(this.news);
      } catch (error) {
        alert(error.response.data.message);
        console.log(error);
      }
    },
  },
  created() {
    // this.getNews();
  },
  computed: {
    moment() {
      return (v) => {
        // return moment(duration).format("YYYY-MM-DD HH:mm:ss");
        return moment(v).fromNow();
      };
    },
  },
};
</script>

<style>
a {
  color: inherit;
}
</style>
