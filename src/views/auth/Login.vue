<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请登录</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">用户名</label>
            <input
              v-model.trim="username"
              v-validator.required="{ title: '用户名' }"
              type="text"
              class="form-control"
              placeholder="请填写用户名"
            />
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input
              v-model.trim="password"
              id="password"
              v-validator.required="{ title: '密码' }"
              type="password"
              class="form-control"
              placeholder="请填写密码"
            />
          </div>
          <br />
          <button @click="login" type="submit" class="btn btn-lg btn-success btn-block">
            <i class="fa fa-btn fa-sign-in"></i> 登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/debounce";
import { requestLogin } from "@/http/request";
import throttle from "lodash/throttle";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  created() {
    document.addEventListener("keyup", e => {
      if (e.keyCode == 13) {
        this.login();
      }
    });
  },
  methods: {
    login() {
      let fromDatabase = {
        name: this.username,
        password: this.password
      };
      this.commit(fromDatabase, this);
    },
    commit: throttle(async (params, context) => {
      let res = await requestLogin(params);
      if (res.code === 200) {
        context.$store.dispatch("login", res.data);
      } else {
        context.password = "";
      }
    }, 5000)
  }
};
</script>

<style>
</style>