<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <van-form
          ref="loginRef"
          class="sign-in-form"
          :label-width="0"
          @submit="Login"
        >
          <h2 class="title">登录</h2>
          <div class="input-field">
            <i class="fa-solid fa-user"></i>
            <van-field
              v-model="loginForm.name"
              placeholder="账号/手机号"
              :rules="loginRules.name"
            />
          </div>
          <div class="input-field">
            <i class="fa-solid fa-lock"></i>
            <van-field
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              :rules="loginRules.password"
            />
          </div>
          <van-button
            native-type="submit"
            type="primary"
            :loading="loginLoading"
            loading-text="登 录 中"
            class="btn form"
            round
            block
          >
            登 录
          </van-button>
        </van-form>
        <van-form
          ref="signUpRef"
          class="sign-up-form"
          :label-width="0"
          @submit="SignUp"
        >
          <h2 class="title">注册</h2>
          <div class="input-field">
            <i class="fa-solid fa-user"></i>
            <van-field
              v-model="signUpForm.name"
              placeholder="姓名/称呼"
              :rules="signUpRules.name"
            />
          </div>
          <div class="input-field">
            <i class="fa-solid fa-phone"></i>
            <van-field
              v-model="signUpForm.phone"
              placeholder="手机号"
              :rules="signUpRules.phone"
            />
          </div>
          <div class="input-field">
            <i class="fa-solid fa-lock"></i>
            <van-field
              v-model="signUpForm.password"
              type="password"
              placeholder="密码"
              :rules="signUpRules.password"
            />
          </div>
          <div class="input-field">
            <i class="fa-solid fa-lock"></i>
            <van-field
              v-model="signUpForm.confirmPassword"
              type="password"
              placeholder="确认密码"
              :rules="signUpRules.confirmPassword"
            />
          </div>
          <van-button
            native-type="submit"
            type="primary"
            :loading="signUpLoading"
            loading-text="注 册 中"
            class="btn form"
            round
            block
          >
            注 册
          </van-button>
        </van-form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>新用户 ?</h3>
          <p>输入您的信息成为我们的客户</p>
          <button id="sign-up-btn" class="btn transparent">注 册</button>
        </div>
        <img src="/assets/log.svg" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>已有账号 ?</h3>
          <p>请登录以享受我们更多的服务</p>
          <button id="sign-in-btn" class="btn transparent">登 录</button>
        </div>
        <img src="/assets/register.svg" class="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import store from '@/store'
import { login, signUp } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      loginLoading: false,
      signUpLoading: false,
      loginForm: {
        name: '',
        password: ''
      },
      signUpForm: {
        name: '',
        phone: '',
        password: '',
        confirmPassword: ''
      },
      loginRules: {
        name: [
          {
            required: true,
            message: '请输入账号/手机号',
            trigger: 'onBlur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'onBlur'
          }
        ]
      },
      signUpRules: {
        name: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'onBlur'
          }
        ],
        phone: [
          {
            required: true,
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入11位手机号',
            trigger: 'onBlur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'onBlur'
          }
        ],
        confirmPassword: [
          {
            validator: (value) => {
              if (value === '') {
                return '请再次输入密码'
              } else if (value !== this.signUpForm.password) {
                return '两次输入密码不一致!'
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.loginLoading = false
    this.signUploading = false

    const sign_in_btn = document.querySelector('#sign-in-btn')
    const sign_up_btn = document.querySelector('#sign-up-btn')
    const container = document.querySelector('.container')

    sign_up_btn.addEventListener('click', () => {
      container.classList.add('sign-up-mode')
    })

    sign_in_btn.addEventListener('click', () => {
      container.classList.remove('sign-up-mode')
    })
  },
  methods: {
    Login() {
      this.$refs.loginRef.validate().then(() => {
        this.loginLoading = true

        const params = new URLSearchParams()
        params.append('username', this.loginForm.name)
        params.append('password', this.loginForm.password)

        login(params)
          .then((res) => {
            this.loginLoading = false
            this.$notify({ type: 'success', message: '登录成功' })
            store
              .dispatch('user/setToken', {
                token: res.data.data
              })
              .then(() => {
                if (router.query && router.query.from) {
                  router.push(String(router.query.from))
                } else {
                  router.push('/').catch(() => {})
                }
              })
          })
          .catch((error) => {
            this.$notify({
              type: 'danger',
              message: '登录失败，' + error.message
            })
            this.loginLoading = false
          })
      })
    },
    SignUp() {
      this.$refs.signUpRef.validate().then(() => {
        this.signUpLoading = true

        const params = new URLSearchParams()
        params.append('username', this.signUpForm.name)
        params.append('phone', this.signUpForm.phone)
        params.append('password', this.signUpForm.confirmPassword)

        signUp(params)
          .then((res) => {
            this.signUpLoading = false
            this.$notify({ type: 'success', message: '注册成功' })
            // 清空表单
            Object.keys(this.signUpForm).forEach((key) => {
              this.signUpForm[key] = ''
            })
            document.getElementById('sign-in-btn').click()
          })
          .catch((error) => {
            this.$notify({
              type: 'danger',
              message: '注册失败，' + error.message
            })
            this.signUpLoading = false
          })
      })
    }
  }
}
</script>

<style>
@import '~@/styles/style.less';

.van-cell {
  padding: 0;
  background: none;
  overflow: unset;
}

.van-field__body {
  height: 100%;
}
</style>
