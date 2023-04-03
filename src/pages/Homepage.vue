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
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <span class="q-ml-sm text-h6 text-center">Remember to update your condition!</span>
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
          <!-- <q-btn flat label="Yes, delete" color="primary" @click="deleteMedicine(medi.medicine_id)" /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { Cookies } from "quasar";
import moment from "moment";
import { store } from "../store.js";
import { ref } from "vue";

export default {
  setup() {
    return {
        confirm: ref(false),
    }
  },
  data() {
    return {
      news: [],
      store,
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
    remindUpdate(){
      this.confirm = true;
      Cookies.set('noti', 1)
      console.log(this.confirm);
    }
  },
  created() {
    this.getNews();
    if((this.store.user.role_id == 1) && (Cookies.get('noti') !== 1)){
      this.remindUpdate();
    }
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
