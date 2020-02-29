<template>
 <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">用户名</label>
            <input v-model.trim="username" v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" type="text" class="form-control" placeholder="请填写用户名">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input id="password" v-model.trim="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码">
          </div>
          <div class="form-group">
            <label class="control-label">确认密码</label>
            <input v-model.trim="cpassword" v-validator.required="{ target: '#password' }" type="password" class="form-control" placeholder="请填写确认密码">
          </div>
          <div class="form-group">
            <label class="control-label">图片验证码</label>
            <input v-model.trim="captcha" v-validator.required="{ title: '图片验证码' }" type="text" class="form-control" placeholder="请填写验证码">
          </div>
          <div class="thumbnail" title="点击图片重新获取验证码" @click="getCaptcha">
            <div class="captcha vcenter" v-html="captchaTpl"></div>
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
            <i class="fa fa-btn fa-sign-in"></i> 注册
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createCaptcha from '@/utils/createCaptcha'
import ls from '@/utils/ls'
import {requestRegister} from '@/http/request'
import {debounce} from '@/utils/debounce'

export default {
  name: "Register",
  data() {
    return {
      localCaptcha: '' , //!! 保存本地验证码
      captchaTpl: '',    //!! 保存验证码模板文件
      captcha: '',        //!! 用户输入的验证码
      username: '',
      password: '',
      cpassword: ''
    }
  },
  created() {
    //! 页面展示之前生成一次验证码
    this.getCaptcha()
  },
  methods: {
    //! 清空数据
    clearInput() {
      this.captcha = '',
      this.username= '',
      this.password = '',
      this.cpassword = ''
    },
    //! 获取验证码
    getCaptcha() {
      const { tpl , captcha} = createCaptcha()
      this.captchaTpl = tpl
      this.localCaptcha = captcha
    },
  
    //! 提交注册
    register() {
      if(this.localCaptcha !== this.captcha.toUpperCase()) {
        this.$notify({
          duration: 2000,
          title: '注册信息提示',
          type: 'error',
          text: '验证码不正确,请重新输入'
        })
 
        //! 验证码不正确时，重置验证码
        this.getCaptcha()
        return
      } else {
        const userInfo = {
          name: this.username,
          password: this.password,
          avatar: `https://api.adorable.io/avatars/200/${this.username}.png`
        }
        this.commitDataBase(userInfo,this)
      }
    },
    //! 提交用户数据至数据库
    commitDataBase:debounce(async (userInfo,context) => {
      let responseUser = await requestRegister(userInfo)
 
      if(responseUser.code === 200) {
        context.$notify({title: '注册信息提示',type: 'success', text: '注册成功'})
        //!! 注册成功跳转到登录
        context.$router.push({name: "Login"})
      } else {     
        context.$notify({
          type: 'error',
          title: '注册信息提示',
          text: responseUser.msg
        })
        context.clearInput()
      }
    },500), 
  }
};
</script>

<style scoped>
.thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
.captcha { font-size: 24px; font-weight: bold; user-select: none;}
</style>