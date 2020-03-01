<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h2>
          <i class="fa fa-lock"></i> 修改密码
        </h2>
        <hr />
        <div class="form-horizontal" data-validator-form>
          <div class="form-group">
            <label class="col-sm-2 control-label">密 码</label>
            <div class="col-sm-6">
              <input
                v-model.trim="password"
                id="password"
                v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }"
                type="password"
                class="form-control"
                placeholder="请填写密码"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">确认密码</label>
            <div class="col-sm-6">
              <input
                v-model.trim="cpassword"
                v-validator.required="{ title: '确认密码', target: '#password' }"
                type="password"
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updatePassword">应用修改</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requestUpdateUser } from "@/http/request";
import throttle from "lodash/throttle";
export default {
  name: "EditPassword",
  data() {
    return {
      password: "",
      cpassword: ""
    };
  },
  methods: {
    updatePassword: throttle(async function() {
      let user = this.$store.state.user;
      delete user.hobbies;

      let params = Object.assign({}, user, { password: this.password });
      let res = await requestUpdateUser(params);
      if (res.code == 200) {
        this.$notify({
          title: "更新提示",
          type: "success",
          text: "密码更新成功，需重新登录"
        });
      }
      this.$store.dispatch("updateUser", res.data);
      this.$store.dispatch("logout");
      this.cleanData();
    }, 5000),
    cleanData() {
      this.password = "";
      this.cpassword = "";
    }
  }
};
</script>

<style>
</style>