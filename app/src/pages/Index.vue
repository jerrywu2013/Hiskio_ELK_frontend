<template>
  <q-page class="bg-white">
    <div class="row q-pa-md justify-end">
      <q-select
        class="col-1"
        v-model="userId"
        :options="allUserIds"
        dense
        outlined
        label="User ID"
      />
    </div>
    <div class="q-pa-md row justify-center">
      <q-icon name="far fa-newspaper" size="10vh" />
    </div>
    <div class="row justify-center text-h2 q-py-md">新聞搜尋網站</div>
    <div class="row justify-center text-h5 q-py-md">Made By Jerry Elastic</div>
    <div class="row justify-center q-py-md">
      <q-input
        v-model.trim="searchStr"
        class="col"
        style="max-width: 25vw"
        @keydown.enter.prevent="getNews(searchStr)"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchStr !== ''"
            name="close"
            @click="searchStr = ''"
            class="cursor-pointer"
          />
          <q-btn :loading="loading" dense flat icon="search" round @click="getNews(searchStr)" />
        </template>
      </q-input>
    </div>

    <div class="row justify-center q-py-md">
      <q-slide-transition>
        <q-card v-if="data.length > 0" class="content-card" bordered flat>
          <q-card-section class="text-h6">焦點新聞</q-card-section>
          <q-card-section>
            <q-list>
              <q-item
                v-for="news of data"
                :key="news.content"
                clickable
                @click="updateRecord(news.source.url, news.title)"
              >
                <q-item-section avatar>
                  <q-avatar square size="200px">
                    <q-img v-if="news.images.length > 0" :src="news.images[0].url" />
                    <q-icon v-else name="far fa-newspaper" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label overline>{{ news.source.site }}</q-item-label>
                  <q-item-label>{{ news.title }}</q-item-label>
                  <q-item-label caption lines="5">{{ news.content }}</q-item-label>
                </q-item-section>

                <q-item-section side>{{ formatDateStr(news.posted_at) }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>

    <div class="row justify-center q-py-md">
      <q-slide-transition>
        <q-card v-if="docsRecommended.length > 0" class="content-card" bordered flat>
          <q-card-section class="text-h6">推薦閱讀</q-card-section>
          <q-card-section>
            <q-list>
              <q-item
                v-for="news of docsRecommended"
                :key="news.content"
                clickable
                @click="updateRecord(news.source.url, news.title)"
              >
                <q-item-section avatar>
                  <q-avatar square size="200px">
                    <q-img v-if="news.images.length > 0" :src="news.images[0].url" />
                    <q-icon v-else name="far fa-newspaper" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label overline>{{ news.source.site }}</q-item-label>
                  <q-item-label>{{ news.title }}</q-item-label>
                  <q-item-label caption lines="5">{{ news.content }}</q-item-label>
                </q-item-section>

                <q-item-section side>{{ formatDateStr(news.posted_at) }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { date, openURL } from "quasar";

// 定義 Vue 元件
export default defineComponent({
  name: "PageIndex",
  setup() {
    const data = ref([]);
    const loading = ref(false);
    const searchStr = ref("");
    const userId = ref(1);
    const allUserIds = ref([1, 2, 3, 4, 5]);
    const docsRecommended = ref([]);

    // functions

    // 轉換 Date Object 到字串
    const formatDateStr = (dateStr) => {
      return date.formatDate(dateStr, "YYYY-MM-DD HH:mm:ss");
    };

    // 查詢 ES 內文 (content) 欄位
    const queryEsByKeyword = async (keyword) => {
      let esQuery = {
        query: { match_phrase: { content: keyword } },
        size: 10000,
      };
      if (keyword.trim().length === 0) esQuery.query = { match_all: {} };
      let resp = await fetchEs(esQuery);
      return resp.json();
    };

    // 查詢 ES 標題 (title) 欄位
    const queryEsByTitles = async (titles) => {
      let titlesQuery = []
      for (const t of titles) titlesQuery.push({ match_phrase: { title: t } })
      let esQuery = {
        query: { bool: { should: titlesQuery } },
        size: 10000
      };
      let resp = await fetchEs(esQuery);
      return resp.json();
    }

    // 發送 Request 到 ES
    const fetchEs = async (queryJson) => {
      let resp = await fetch("/elk2021_news/_search", {
        body: JSON.stringify(queryJson),
        cache: "no-cache",
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      return resp;
    }

    // 取得新聞
    const getNews = async (keyword) => {
      if (loading.value) return;

      loading.value = true;
      let esReturns = await queryEsByKeyword(keyword);
      const docs = esReturns.hits.hits.map((el) => el._source);
      data.value = docs;
      loading.value = false;
    };

    // 更新使用者行為紀錄
    const updateRecord = async (url, title) => {
      openURL(url)

      let data = { user_id: userId.value.toString(), title: title }
      if (data.user_id.trim().length === 0) return;
      await fetch("/record", {
        body: JSON.stringify(data),
        cache: "no-cache",
        method: "POST",
        headers: { "content-type": "application/json" },
      });
    }

    // 取得使用者的推薦項目
    const getRecommendations = async () => {
      let data = { user_id: userId.value.toString() };
      let resp = await fetch("/recommend", {
        body: JSON.stringify(data),
        cache: "no-cache",
        method: "POST",
        headers: { "content-type": "application/json" }
      })
      return resp.json();
    }

    // 頁面載入時執行一次
    onMounted(async () => {
      // 取得使用者的推薦項目
      let recommendedTitles = await getRecommendations();

      // 以標題查詢 ES 文檔
      let esReturns = await queryEsByTitles(recommendedTitles);

      // 整理 ES 資料格式
      const docs = esReturns.hits.hits.map((el) => el._source);

      // 把資料存到 docsRecommended 變數
      docsRecommended.value = docs;
    })

    return {
      searchStr,
      data,
      userId,
      loading,
      getNews,
      allUserIds,
      docsRecommended,
      formatDateStr,
      updateRecord,
    };
  },
});
</script>

<style lang="sass" scoped>
.content-card
  width: 100%
  max-width: 75vw
</style>
