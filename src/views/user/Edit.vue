<template>
  <div class="users-show">
    <div class="col-md-3 main-col">
      <div class="box">
        <div class="padding-md">
          <div class="list-group text-center">
            <router-link 
              v-for="link in links" 
              :key="link.name" 
              :to="`/user/${user.id}/${link.name}`" 
              class="list-group-item"
            >
              <i :class="`text-md fa fa-${link.icon}`"></i>
              {{ link.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
import {requestMenus} from '@/http/request'
export default {
  name: "UserEdit",
  computed: {
    user() {
      return this.$store.state.user
    },
    links() {
      return this.$store.getters.menus
    }
  },
  async created() {
    if(!this.links) {
      let res = await requestMenus()
      if(res.code === 200) {
        this.$store.dispatch('setMenus', res.data)
      }
    }
  },
  methods: {
    
  }
}
</script>

<style>

</style>