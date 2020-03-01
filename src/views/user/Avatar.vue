<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h2>
          <i class="fa fa-picture-o"></i> 请输入头像地址
        </h2>
        <hr />
        <div data-validator-form>
          <div class="form-group">
            <label>头像预览：</label>
            <div>
              <img :src="avatar" class="avatar-preview-img" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-8">
              <input
                v-model.trim.lazy="avatar"
                v-validator.required="{ title: '头像地址' }"
                type="text"
                class="form-control avatar-input"
              />
            </div>
            <div class="clearfix"></div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-lg btn-primary" @click="updateAvatar">上传头像</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { requestUpdateUser } from "@/http/request";
export default {
  name: "EditAvatar",
  data() {
    return {
      avatar: "",
      user: false
    };
  },
  created() {
    let user = this.$store.state.user;
    this.$nextTick(() => {
      this.user = user;
      delete this.user.hobbies;
      this.avatar = user.avatar;
    });
  },
  methods: {
    updateAvatar: throttle(async function() {
      let params = Object.assign({}, this.user, { avatar: this.avatar });
      let res = await requestUpdateUser(params);
      if (res.code == 200) {
        this.$notify({ title: "更新提示", type: "success", text: "更新成功" });
        this.$store.dispatch("updateUser", res.data);
      }
    }, 5000)
  }
};
</script>

<style>
</style>