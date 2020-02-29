<template>
  <nav class="navbar navbar-default navbar-fixed-top topnav">

    <div class="container">

      <div class="navbar-header">
        
        <button 
          type="button" 
          class="navbar-toggle collapsed" 
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse" 
          aria-expanded="false"
          @click="handlerShow">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        
        <router-link 
          :to="{name: 'Home'}" 
          class="navbar-brand"
        > 
          <span class="title">{{ logo.title }}</span>
          <img 
            src="@/assets/logo.png" 
            class="img-responsive img-rounded" 
            :alt="logo.title"
          >
        </router-link>

      </div>

      
      <div
        id="bs-example-navbar-collapse" 
        class="collapse navbar-collapse"
        :class="{in: activeCollapse}"
        aria-expanded="false"
        >
        <ul class="nav navbar-nav">
          <li 
              v-for="(item , index) in navList"
              :key="index"
              :class="{active: index === activeIndex}"
              @click="changeIndex(index)"
            >
              <a href="#">{{ item }}</a>
            </li>
        </ul>


        <!-- 登录/注册组件 -->
        <ul class="nav navbar-nav navbar-right">
          <the-entry></the-entry>
        </ul>



      </div><!-- /.navbar-collapse -->
      
       

  
    </div>
  </nav>
</template>

<script>
import TheEntry from './TheEntry'
export default {
  name: 'TheHeader',
  data() {
    return {
      activeIndex: 0,
      activeCollapse: false,
      logo: {
        title: 'MyTest'
      },
      navList: ['社区','头条','问答','教程']
    }
  },
  methods: {
    changeIndex(index) {
      this.activeIndex = index
    },
    handlerShow() {
      this.activeCollapse = !this.activeCollapse
    }
  },
  components: {
    TheEntry
  }
}
</script>

<style scoped>
  .title{ display: none; }
</style>