<template>
  <div id="app">
    <div id="wrap">
      <the-header></the-header>
      <div id="main-container" class="container main-container">
        <router-view></router-view>
        <notifications position="top center" />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "@c/Layouts/TheHeader";
import TheFooter from "@c/Layouts/TheFooter";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter
  },
  mounted() {}
};
</script>

<style lang="scss">
#app {
  height: 100%;
}
$container-large-desktop: 1200px;
$btn-primary-bg: #00b5ad;
$btn-primary-border: #00b5ad;
$label-primary-bg: #00b5ad;
$pagination-active-bg: #00b5ad;
$pagination-active-border: #00b5ad;
$pagination-color: #00b5ad;
$input-border-focus: #00b5ad;
$link-color: #12c4c5;
$link-hover-color: #22ddde;
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
$fa-font-path: "~font-awesome/fonts/";
body > .container {
  margin-top: 15px;
}
#nprogress .bar {
  background: rgba(65, 184, 131, 0.8) !important;
}
</style>
