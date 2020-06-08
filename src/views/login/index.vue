<template>
  <div class="login-container">
    <div class="wrapper">
      <swiper ref="swiperQX" :options="swiperOption" style="width:100vw;height:100vh;position: absolute;z-index: 2;">
        <swiper-slide>
          <img src="@img/background1.jpg" style="width:100%;height:100%">
        </swiper-slide>
        <swiper-slide>
          <img src="@img/background2.jpg" style="width:100%;height:100%">
        </swiper-slide>
      </swiper>
    </div>
    <div class="left">
      <div class="title-container">
        <!-- <img src="@img/icon1.png" style="width:70px"> -->

        <div style="width:100%;height:100vh;display:flex;align-items:center;position: absolute;top: 0;justify-content: center;">
          <img src="@img/icon2.png" style="width:70px;margin-right:20px">
          <h3 class="centerTitle">  平湖市治理设施工况（电量）监测系统</h3>
          <div style="position: absolute;bottom: 15px;left:20px;display:flex;align-items:center;">
            <img src="@img/hs_logo.png" style="height:42px;margin:0px 0px 5px 0px;">
            <span style="color:white;margin:0px 10px">Copyright © www.sea-splendor.com 版权所有 </span><span style="color:white;margin:0px 10px">海晟科技官方网站：<a href="http://www.sea-splendor.com">http://www.sea-splendor.com</a></span>
          </div>
        </div>

      </div>

    </div>
    <div class="right">
      <div class="weatherPostiton">
        <iframe allowtransparency="true" frameborder="0" width="410" height="96" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=3&t=0&v=0&d=3&bd=0&k=&f=ffffff&ltf=009944&htf=cc0000&q=1&e=0&a=0&c=60160&w=450&h=96&align=center" />
        <!-- <div class="bkWeather" />
        <div id="he-plugin-standard" /> -->
      </div>

      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div style=" color: white;margin-bottom: 10px;">用户登录</div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: 'fth',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      swiperOption: {
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        loop: true,
        speed: 1000
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    window.WIDGET = {
      CONFIG: {
        'layout': 1,
        'width': '450',
        'height': '150',
        'background': 1,
        'dataColor': 'FFFFFF',
        'borderRadius': 5,
        'city': 'CN101210305',
        'key': '24990edf2cef4a9ab7598682f12d5e52'
      }
    };
    (function(d) {
      var cs = d.createElement('link')
      cs.rel = 'stylesheet'
      cs.href = 'https://apip.weatherdt.com/view/static/css/tqw_widget_view.css?v=0101'
      var s = d.createElement('script')
      s.src = 'https://widget.heweather.net/standard/static/js/he-standard-common.js?v=1.1'
      var sn = d.getElementsByTagName('script')[0]
      sn.parentNode.insertBefore(cs, sn)
      sn.parentNode.insertBefore(s, sn)
    })(document)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .centerTitle{
      font-size: 38px;
      color: #7d7d7d;
      text-align: center;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .right{
    position: absolute;
    width: 30%;
    height:100vh;
    z-index: 6;
    right:0px;
    background: rgba(0, 0, 0, 0.5);
  }
  .left{
    position: absolute;
    width: 70%;
    height:100vh;
    z-index: 5;
    left:0px;
  }
  .weatherPostiton{
   display: flex;
    align-items: center;
    justify-content: center;
    height: 20vh;
    margin-top: 10vh;
  }
  .bkWeather{
    max-width: 450px;
    height: 150px;
    background: #0b0d20;
    position: absolute;
    border-radius: .4em;
  }
}
</style>
