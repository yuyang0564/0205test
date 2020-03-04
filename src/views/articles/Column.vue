<template>
  <div class="blog-container">
    <div class="blog-pages">
      <!-- 用于渲染『文章列表』和『文章内容』 -->
      <router-view />

      <div class="col-md-3 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <div class="image blog-cover">
              <section>
                <img :src="user.avatar" class="avatar-112 avatar img-thumbnail" />
              </section>
            </div>
            <div class="blog-name">
              <h4>
                <span>{{ user.name }} 的专栏</span>
              </h4>
            </div>
            <hr />
            <router-link :to="{name: 'UserArticleColumn',params: {username: user.name}}">
              <li class="list-group-item">
                <i class="text-md fa fa-list-ul"></i>
                专栏文章（{{ user.article_count }}）
              </li>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requestGetUser } from "@/http/request";
export default {
  name: "ArticleColumn",
  data() {
    return {
      user: ""
    };
  },
  async created() {
    let params = { name: this.$route.params.username };
    let res = await requestGetUser(params);
    if (res.code == 200) {
      this.user = res.data;
      this.$store.dispatch("setUid", res.data.id);
    }
  }
};
</script>

<style>
</style>