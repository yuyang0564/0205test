<template>
  <div class="blog-container" style="margin-top:20px">
    <div class="blog-pages">
      <div class="col-md-9 left-col pull-right">
        <div class="panel article-body content-body">
          <h1 class="text-center">{{ title }}</h1>
          <div class="article-meta text-center">
            <i class="fa fa-clock-o"></i>
            <span>{{ createTime }}</span>
          </div>
          <div class="entry-content">
            <div class="content-body entry-content panel-body">
              <div class="markdown-body" ref="markdownContent" v-html="content"></div>
              <div v-if="auth && user.id == uid" class="panel-footer operate">
                <div class="actions">
                  <a @click.stop="deleteArticle" class="admin" title="删除">
                    <i class="fa fa-trash-o"></i>
                  </a>

                  <router-link
                    :to="{name: 'ArticleUpdate' , params: {articleId: id}}"
                    class="admin"
                    title="编辑"
                  >
                    <i class="fa fa-pencil-square-o"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Simplemde from "simplemde";
import hljs from "highlight.js";
import { requestGetArticleItem, requestArticleDelete } from "@/http/request";
import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar";
import CN from "dayjs/locale/zh-cn";
dayjs.extend(Calendar);
dayjs.locale("zh-cn");

export default {
  name: "Content",
  data() {
    return {
      id: "",
      uid: "",
      title: "",
      content: "",
      createTime: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    auth() {
      return this.$store.getters.auth;
    }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  created() {
    this.id = this.$route.params.articleId;
  },
  async mounted() {
    let params = { id: this.id };
    let article = await requestGetArticleItem(params);
    if (article.code == 200) {
      let { uid, title, content, create_time, update_tile } = article.data;
      this.title = title;
      this.uid = uid;
      this.createTime = this.calculationTime(
        update_tile ? update_tile : create_time
      );
      this.content = Simplemde.prototype.markdown(content);
      this.$nextTick(() => {
        let markdown = this.$refs.markdownContent;
        markdown.querySelectorAll("pre code").forEach(el => {
          hljs.highlightBlock(el);
        });
      });
    }
  },
  methods: {
    deleteArticle() {
      let params = { id: this.id };
      requestArticleDelete(params).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: "删除提醒",
            type: "success",
            text: "删除成功"
          });
          this.$router.replace({
            name: "UserArticleColumn",
            params: { username: this.user.name, articleId: this.id }
          });
        }
      });
    },
    calculationTime(createTime) {
      let time = dayjs.unix(createTime).format("YYYY-MM-DD HH:mm:ss");
      let now = dayjs().format("YYYY-MM-DD HH:mm:ss");
      return dayjs(time).calendar(dayjs(now), {
        sameDay: "dddd HH:mm ", // The same day ( Today at 2:30 AM )
        nextDay: "dddd HH:mm", // The next day ( Tomorrow at 2:30 AM )
        nextWeek: "YYYY/MM/DD", // The next week ( Sunday at 2:30 AM )
        lastDay: "dddd HH:mm ", // The day before ( Yesterday at 2:30 AM )
        lastWeek: "YYYY/MM/DD", // Last week ( Last Monday at 2:30 AM )
        sameElse: "YYYY/MM/DD" // Everything else ( 7/10/2011 )
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~highlight.js/styles/atom-one-dark.css";
.entry-content /deep/ pre code {
  font-size: 18px;
}
</style>

