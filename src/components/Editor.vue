<template>
  <div class="blog-container">
    <div class="blog-pages">
      <div class="col-md-12 panel">
        <div class="panel-body">
          <h2 class="text-center">{{ blockTitle }}</h2>
          <hr />
          <div data-validator-form>
            <div class="form-group">
              <input
                v-model.trim="title"
                @input="autoSaveArticle"
                v-validator.required="{ title: '标题' }"
                type="text"
                class="form-control"
                placeholder="请填写标题"
              />
            </div>
            <div class="form-group">
              <!-- simplemde编辑器 -->
              <textarea ref="markdownEditor"></textarea>
            </div>
            <br />
            <div class="form-group">
              <button @click="commit" class="btn btn-primary" type="submit">发 布</button>
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
import ls from "@/utils/ls";
import throttle from "lodash/throttle";
window.hljs = hljs;
export default {
  name: "SimpleMDEEditor",
  data() {
    return {
      simplemdeEditor: {},
      content: "",
      title: ""
    };
  },
  props: {
    updateTitle: {
      type: String
    },
    updateContent: {
      type: String
    },
    blockTitle: {
      type: String,
      default: "创作文章"
    },
    submit: {
      type: Function,
      default() {
        return {};
      }
    }
  },
  methods: {
    autoSaveArticle() {
      ls.sessionSet("articleTitle", this.title);
    },
    commit: throttle(function() {
      if (this.beforeCommit()) {
        this.submit({
          title: this.title,
          content: this.content
        });
        this.cleanArticleContent();
      }
    }, 3000),
    beforeCommit() {
      if (!this.title.length || !this.content.length) {
        this.$notify({ type: "error", text: "请勿提交空内容" });
        return false;
      }
      return true;
    },
    cleanArticleContent() {
      this.title = "";
      this.content = "";
      ls.sessionRemove("articleTitle");
      ls.sessionRemove("articleContent");
      this.simplemdeEditor.value("");
    }
  },
  watch: {
    updateTitle(ndata) {
      this.title = ndata;
    },
    updateContent(ndata) {
      this.content = ndata;
      this.simplemdeEditor.value(this.content);
    }
  },
  created() {
    //! 恢复编辑中的文章
    let title = ls.sessionItem("articleTitle");
    let content = ls.sessionItem("articleContent");

    this.$nextTick(() => {
      this.title = title;
      this.content = content;
    });
  },
  mounted() {
    this.simplemdeEditor = new Simplemde({
      element: this.$refs.markdownEditor,
      placeholder:
        "请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。",
      autoDownloadFontAwesome: false,
      spellChecker: false,
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    });

    this.simplemdeEditor.codemirror.on("change", () => {
      this.content = this.simplemdeEditor.value();
      ls.sessionSet("articleContent", this.content);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~simplemde/dist/simplemde.min.css";
@import "~highlight.js/styles/atom-one-dark.css";
.entry-content /deep/ pre code {
  font-size: 18px;
}
.blog-container {
  max-width: 980px;
  margin: 0 auto;
  margin-top: 20px;
}
textarea {
  overflow-y: scroll;
}
</style>
