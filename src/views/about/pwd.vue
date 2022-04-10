<template>
  <div class="content">
    <van-form ref="pwdForm" @submit="changePwd" class="form">
      <van-cell-group inset>
        <van-field
          label="旧密码"
          placeholder="旧密码"
          type="password"
          v-model="form.oldPassword"
          :rules="rules.oldPassword"
        />
        <van-field
          label="新密码"
          placeholder="新密码"
          type="password"
          :maxlength="12"
          v-model="form.newPassword"
          :rules="rules.newPassword"
        />
        <van-field
          label="确认密码"
          placeholder="确认密码"
          type="password"
          :maxlength="12"
          v-model="form.confirmPassword"
          :rules="rules.confirmPassword"
        />
      </van-cell-group>
      <div class="button">
        <van-button native-type="submit" type="primary" size="large" round>
          保 存
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { changePwd, logOut } from '@/api/user'
import qs from 'qs'

export default {
  name: 'ChangePwd',
  inject: ['reload'],
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'onBlur'
          }
        ],
        newPassword: [
          {
            validator: (value) => {
              if (value === '') {
                return '请输入新密码'
              } else if (value.length < 6) {
                return '密码必须大于或等于6位!'
              }
            },
            trigger: 'onBlur'
          }
        ],
        confirmPassword: [
          {
            validator: (value) => {
              if (value === '') {
                return '请再次输入密码'
              } else if (value !== this.form.newPassword) {
                return '两次输入密码不一致!'
              }
            },
            trigger: 'onBlur'
          }
        ]
      }
    }
  },
  methods: {
    changePwd() {
      this.$refs.pwdForm.validate().then(() => {
        changePwd(qs.stringify(this.form))
          .then((res) => {
            if (res.data.success) {
              this.$toast.success({
                message: '保存成功，请重新登录'
              })
              logOut()
                .then(() => {
                  // 清除缓存的token
                  this.$store.dispatch('user/removeToken').then(() => {
                    // 这样跳转避免再次登录重复注册动态路由
                    location.replace('/login')
                  })
                })
                .catch((error) => {
                  this.$toast.fail({
                    message: error.message
                  })
                })
            }
          })
          .catch((error) => {
            this.$toast.fail({
              message: '保存失败，' + error.message
            })
          })
      })
    }
  }
}
</script>

<style scoped>
.content {
  padding: var(--van-padding-md) 0;
}

.button {
  padding: 32px 16px 0 16px;
}
</style>
