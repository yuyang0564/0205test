<template>
  <div id="article_create">
    <markdown-editor blockTitle="创建文章" :submit="submit"></markdown-editor>
  </div>
</template>

<script>
import MarkdownEditor from "@c/Editor";
import { requestCreateArticle } from "@/http/request";
export default {
  name: "Create",
  data() {
    return {};
  },
  methods: {
    async submit(data) {
      let { title, content } = data;
      let params = {
        uid: this.$store.state.user.id,
        title,
        content
      };
      let res = await requestCreateArticle(params);
      if (res.code == 200) {
        this.$notify({
          title: "文章操作提示",
          type: "success",
          text: "发布成功"
        });
        this.$router.replace({
          name: "ArticleContent",
          params: { articleId: res.data }
        });
      }
    }
  },
  components: {
    MarkdownEditor
  }
};
</script>

<style >
</style>

