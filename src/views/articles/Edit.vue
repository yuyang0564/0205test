<template>
  <div id="article_edit">
    <markdown-editor
      blockTitle="更新文章"
      :update-title="title"
      :update-content="content"
      :submit="submit"
    ></markdown-editor>
  </div>
</template>

<script>
import MarkdownEditor from "@c/Editor";
import ls from "@/utils/ls";
import { requestGetArticleItem, requestUpdateArticle } from "@/http/request";
export default {
  name: "ArticleEdit",
  data() {
    return {
      id: "",
      title: "",
      content: ""
    };
  },
  methods: {
    async submit(data) {
      if (data) {
        let { title, content } = data;
        let params = { id: this.id, title, content };
        let res = await requestUpdateArticle(params);
        if (res.code == 200) {
          this.$notify({
            title: "文章操作提示",
            type: "success",
            text: "更新成功"
          });
          this.$router.replace({
            name: "ArticleContent",
            params: {
              articleId: res.data.id,
              username: this.$store.state.user.name
            }
          });
        }
      }
    }
  },
  async created() {
    let id = this.$route.params.articleId;
    if (id) {
      let params = { id };
      let res = await requestGetArticleItem(params);
      if (res.code == 200) {
        let { title, content, id } = res.data;
        this.id = id;
        this.title = title;
        this.content = content;
      }
    }
  },
  components: {
    MarkdownEditor
  }
};
</script>

<style>
</style>