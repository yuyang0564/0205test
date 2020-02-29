<template>
  <footer class="footer">
    <div class="container">
      <div class="row footer-top">

        <div class="col-sm-5 col-lg-5">
          <p class="padding-top-xsm">{{ description }}</p>

          <div class="text-md">
            <a 
              v-for="(item, index) in contacts"
              v-footer-title="item.title"
              :key="index" 
              :title="item.title" 
              :href="item.link" 
              :style="contactStyle" 
              target="_blank"
            >
              <i :class="`fa fa-${item.icon}`"></i>
            </a>
          </div>

          <br>

          <span v-html="designer"></span>
        </div>

        <div class="col-sm-6 col-lg-6 col-lg-offset-1">
          <div class="row">

            <div class="col-sm-4">
              <h4>{{ sponsor.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="(item,index) in sponsor.list" :key="index">
                  <a :href="item.link" target="_blank">
                    <img
                      v-footer-title="item.title" 
                      :title="item.title" 
                      :src="item.logo" 
                      :alt="item.title" 
                      class="footer-sponsor-link" 
                      width="98"
                    >
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-sm-4">
              <h4>{{ statistics.title }}</h4>

              <ul class="list-unstyled">
                <li 
                  v-for="(item , index) in statistics.list" 
                  :key="index"
                >
                {{ item.title }}: {{ item.description }}
                </li>
              </ul>
            </div>

            <div class="col-sm-4">
              <h4>{{ other.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="(item,index) in other.list" :key="index">
                  <a :href="item.link" :title="item.title" target="_blank">
                    <i :class="`fa fa-${item.icon}`"></i> {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  </footer>
</template>

<script>
import footerTitle from '@/directives/title'
import {requestFooterData} from '@/http/request'
import _ from 'lodash'
export default {
  name: 'TheFooter',
  data() {
    return {
      description: 'VuejsCaff 是一个 Vue.js 的知识社区',
      contacts: [],
      contactStyle: {
        paddingRight: '8px'
      },
      designer: '',
      sponsor: {},
      statistics: {},
      other: {}
    }
  },
  created() {
    this.getFooterData(this)
  },
  methods: {
    getFooterData: _.debounce(async (context)=> {
      const res = await requestFooterData()
        context.$nextTick(() => {
          context.contacts = res.contacts
          context.designer = res.designer
          context.sponsor = res.sponsor
          context.statistics = res.statistics
          context.other = res.other
        })
    },500)
  },
  directives: {
    footerTitle
  }
}
</script>

<style scoped>
a:hover, a:focus { color: #e27575; transition: color .15s;}
</style>