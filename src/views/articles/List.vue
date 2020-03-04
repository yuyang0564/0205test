<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body article-index">
      <div class="panel-body">
        <h1 class="all-articles">专栏文章</h1>
        <ul class="list-group">
          <li v-for="article in articles" :key="article.id" class="list-group-item">
            <!-- <img v-if="user" :src="user.avatar" class="avatar avatar-small" /> -->
            <router-link
              :to="{name: 'ArticleContent' , params: {articleId: article.id}}"
              class="title"
            >{{ article.title }}</router-link>
            <span class="meta pull-right">
              <span class="timeago">{{ article.create_time | formatTime }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { requestUserArticles } from "@/http/request";
import format from "@/utils/timeformat";
export default {
  name: "ArticleList",
  data() {
    return {
      articles: []
    };
  },
  mounted() {
    this.$bus.$on("getarticles", data => {
      this.$nextTick(() => {
        this.articles = data;
      });
    });
  },
  filters: {
    formatTime(val) {
      return format(val);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let uid = vm.$store.state.uid;
      requestUserArticles({ uid }).then(res => {
        if (res.code == 200) {
          vm.articles = res.data;
        }
      });
    });
  }
};
</script>

<style>
</style>